import type { StorageDriver } from "./storage-driver";

const PREFIX = "oralclin:";

/** Fallback para navegadores sem IndexedDB (ou modo privado restrito). */
export class LocalStorageDriver implements StorageDriver {
  readonly name = "localstorage";

  static isSupported(): boolean {
    try {
      return typeof window !== "undefined" && !!window.localStorage;
    } catch {
      return false;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    window.localStorage.removeItem(PREFIX + key);
  }

  async keys(): Promise<string[]> {
    return Object.keys(window.localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .map((k) => k.slice(PREFIX.length));
  }
}

/** Usado durante o SSR e em testes: nada é persistido. */
export class MemoryDriver implements StorageDriver {
  readonly name = "memory";
  private store = new Map<string, unknown>();

  async get<T>(key: string): Promise<T | null> {
    return (this.store.get(key) as T | undefined) ?? null;
  }
  async set<T>(key: string, value: T): Promise<void> {
    this.store.set(key, structuredClone(value));
  }
  async remove(key: string): Promise<void> {
    this.store.delete(key);
  }
  async keys(): Promise<string[]> {
    return [...this.store.keys()];
  }
}
