import { IndexedDbDriver } from "./indexeddb-driver";
import { LocalStorageDriver, MemoryDriver } from "./local-storage-driver";
import type { StorageDriver } from "./storage-driver";

export type { StorageDriver } from "./storage-driver";

let driver: StorageDriver | null = null;

/** Seleciona o melhor driver disponível no navegador. */
export function getStorageDriver(): StorageDriver {
  if (driver) return driver;
  if (IndexedDbDriver.isSupported()) driver = new IndexedDbDriver();
  else if (LocalStorageDriver.isSupported()) driver = new LocalStorageDriver();
  else driver = new MemoryDriver();
  return driver;
}

/** Apaga todos os dados da demonstração (usado em Configurações → Restaurar demonstração). */
export async function clearAllData(): Promise<void> {
  const d = getStorageDriver();
  const keys = await d.keys();
  await Promise.all(keys.map((k) => d.remove(k)));
}
