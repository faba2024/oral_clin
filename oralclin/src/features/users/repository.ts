import { LocalCollectionRepository } from "@/repositories/core/local-repository";
import type { Repository } from "@/repositories/core/repository";
import { seedUsers } from "@/data/seed";
import type { User } from "./types";

export interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>;
}

export class LocalUserRepository extends LocalCollectionRepository<User> implements UserRepository {
  constructor() {
    super("users", seedUsers, "usr");
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalized = email.trim().toLowerCase();
    return (await this.list()).find((u) => u.email.toLowerCase() === normalized) ?? null;
  }
}
