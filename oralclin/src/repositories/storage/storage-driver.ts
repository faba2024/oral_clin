/**
 * Contrato mínimo de armazenamento chave/valor usado pela camada local.
 * Toda leitura/escrita de dados do sistema passa por aqui — nenhum componente
 * acessa localStorage ou IndexedDB diretamente.
 */
export interface StorageDriver {
  readonly name: string;
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  keys(): Promise<string[]>;
}
