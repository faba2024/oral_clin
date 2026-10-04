import type { CreateInput, Entity, UpdateInput } from "@/types/common";

/**
 * Contrato genérico de repositório. As implementações locais (IndexedDB)
 * e as futuras implementações HTTP (ApiXRepository) seguem esta interface,
 * de modo que services e telas não precisam mudar na migração.
 */
export interface Repository<T extends Entity> {
  list(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(input: CreateInput<T>): Promise<T>;
  update(id: string, patch: UpdateInput<T>): Promise<T>;
  remove(id: string): Promise<void>;
}

export interface SingletonRepository<T> {
  get(): Promise<T>;
  save(value: T): Promise<T>;
  patch(value: Partial<T>): Promise<T>;
}

export class NotFoundError extends Error {
  constructor(collection: string, id: string) {
    super(`Registro ${id} não encontrado em ${collection}.`);
    this.name = "NotFoundError";
  }
}
