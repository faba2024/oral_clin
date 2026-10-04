import type { StorageDriver } from "./storage-driver";

const DB_NAME = "oralclin-demo";
const STORE = "kv";
const VERSION = 1;

/** Driver principal: IndexedDB comporta imagens e documentos sem o limite de ~5MB do localStorage. */
export class IndexedDbDriver implements StorageDriver {
  readonly name = "indexeddb";
  private dbPromise: Promise<IDBDatabase> | null = null;

  static isSupported(): boolean {
    return typeof window !== "undefined" && "indexedDB" in window;
  }

  private open(): Promise<IDBDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, VERSION);
        request.onupgradeneeded = () => {
          if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE);
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
    return this.dbPromise;
  }

  private async run<R>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => IDBRequest<R>): Promise<R> {
    const db = await this.open();
    return new Promise<R>((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      const request = fn(tx.objectStore(STORE));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.run<unknown>("readonly", (s) => s.get(key));
    return (value ?? null) as T | null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this.run("readwrite", (s) => s.put(value, key));
  }

  async remove(key: string): Promise<void> {
    await this.run("readwrite", (s) => s.delete(key));
  }

  async keys(): Promise<string[]> {
    const keys = await this.run<IDBValidKey[]>("readonly", (s) => s.getAllKeys());
    return keys.map(String);
  }
}
