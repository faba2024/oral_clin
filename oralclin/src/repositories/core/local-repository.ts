import type { CreateInput, Entity, UpdateInput } from "@/types/common";
import { createId } from "@/utils/id";
import { getStorageDriver } from "../storage";
import { dataBus } from "./data-bus";
import { NotFoundError, type Repository, type SingletonRepository } from "./repository";

/** Incrementar quando os dados de demonstração mudarem de formato. */
export const SEED_VERSION = 5;

const cache = new Map<string, unknown>();
/** Leituras em andamento — evita que vários hooks semeiem a mesma coleção ao mesmo tempo. */
const inflight = new Map<string, Promise<unknown>>();

async function ensureSeedVersion() {
  const driver = getStorageDriver();
  const current = await driver.get<number>("__seed_version");
  if (current !== SEED_VERSION) {
    const keys = await driver.keys();
    await Promise.all(keys.map((k) => driver.remove(k)));
    await driver.set("__seed_version", SEED_VERSION);
    cache.clear();
  }
}

let versionCheck: Promise<void> | null = null;
function ready(): Promise<void> {
  if (!versionCheck) versionCheck = ensureSeedVersion();
  return versionCheck;
}

/** Invalida o cache em memória (ex.: após restaurar a demonstração). */
export function resetLocalCache() {
  cache.clear();
  inflight.clear();
  versionCheck = null;
}

/**
 * Repositório local genérico persistido no driver de armazenamento.
 * Mantém cache em memória para leituras instantâneas e emite eventos
 * de alteração para atualizar as telas.
 */
export class LocalCollectionRepository<T extends Entity> implements Repository<T> {
  constructor(
    protected readonly collection: string,
    private readonly seed: () => T[],
    private readonly idPrefix = "",
  ) {}

  protected async read(): Promise<T[]> {
    await ready();
    const cached = cache.get(this.collection) as T[] | undefined;
    if (cached) return cached;
    const pending = inflight.get(this.collection) as Promise<T[]> | undefined;
    if (pending) return pending;
    const load = (async () => {
      const driver = getStorageDriver();
      let data = await driver.get<T[]>(this.collection);
      if (!data) {
        data = this.seed();
        await driver.set(this.collection, data);
      }
      cache.set(this.collection, data);
      return data;
    })();
    inflight.set(this.collection, load);
    try {
      return await load;
    } finally {
      inflight.delete(this.collection);
    }
  }

  protected async write(items: T[]): Promise<void> {
    cache.set(this.collection, items);
    await getStorageDriver().set(this.collection, items);
    dataBus.emit(this.collection);
  }

  async list(): Promise<T[]> {
    return [...(await this.read())];
  }

  async getById(id: string): Promise<T | null> {
    return (await this.read()).find((item) => item.id === id) ?? null;
  }

  async create(input: CreateInput<T>): Promise<T> {
    const now = new Date().toISOString();
    const entity = { ...input, id: input.id ?? createId(this.idPrefix), createdAt: now, updatedAt: now } as T;
    await this.write([...(await this.read()), entity]);
    return entity;
  }

  async update(id: string, patch: UpdateInput<T>): Promise<T> {
    const items = await this.read();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundError(this.collection, id);
    const updated = { ...items[index], ...patch, id, updatedAt: new Date().toISOString() } as T;
    const next = [...items];
    next[index] = updated;
    await this.write(next);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const items = await this.read();
    await this.write(items.filter((item) => item.id !== id));
  }
}

export class LocalSingletonRepository<T extends object> implements SingletonRepository<T> {
  constructor(
    private readonly key: string,
    private readonly seed: () => T,
  ) {}

  async get(): Promise<T> {
    await ready();
    const cached = cache.get(this.key) as T | undefined;
    if (cached) return cached;
    const pending = inflight.get(this.key) as Promise<T> | undefined;
    if (pending) return pending;
    const load = (async () => {
      const driver = getStorageDriver();
      const stored = await driver.get<T>(this.key);
      // Mescla com o seed para que novos campos apareçam após atualizações.
      const value = stored ? ({ ...this.seed(), ...stored } as T) : this.seed();
      if (!stored) await driver.set(this.key, value);
      cache.set(this.key, value);
      return value;
    })();
    inflight.set(this.key, load);
    try {
      return await load;
    } finally {
      inflight.delete(this.key);
    }
  }

  async save(value: T): Promise<T> {
    cache.set(this.key, value);
    await getStorageDriver().set(this.key, value);
    dataBus.emit(this.key);
    return value;
  }

  async patch(value: Partial<T>): Promise<T> {
    return this.save({ ...(await this.get()), ...value });
  }
}
