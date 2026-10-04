import { LocalCollectionRepository } from "@/repositories/core/local-repository";
import type { Repository } from "@/repositories/core/repository";
import { seedProfessionals } from "@/data/seed";
import type { Professional } from "./types";

export type ProfessionalRepository = Repository<Professional>;

export class LocalProfessionalRepository extends LocalCollectionRepository<Professional> implements ProfessionalRepository {
  constructor() {
    super("professionals", seedProfessionals, "prof");
  }
}
