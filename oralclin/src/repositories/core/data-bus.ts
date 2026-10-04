/**
 * Barramento simples de eventos de dados. Repositórios emitem o nome da
 * coleção alterada; hooks de leitura se reinscrevem e recarregam.
 * Também sincroniza abas abertas via BroadcastChannel.
 */
type Listener = (collection: string) => void;

const listeners = new Set<Listener>();
let channel: BroadcastChannel | null = null;

function getChannel(): BroadcastChannel | null {
  if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") return null;
  if (!channel) {
    channel = new BroadcastChannel("oralclin-data");
    channel.onmessage = (event: MessageEvent<string>) => listeners.forEach((l) => l(event.data));
  }
  return channel;
}

export const dataBus = {
  emit(collection: string) {
    listeners.forEach((l) => l(collection));
    getChannel()?.postMessage(collection);
  },
  subscribe(listener: Listener): () => void {
    getChannel();
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
