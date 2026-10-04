import { LocalCollectionRepository } from "@/repositories/core/local-repository";
import type { Repository } from "@/repositories/core/repository";
import { seedPatients } from "@/data/seed";
import { matchesSearch } from "@/utils/format";
import type { Patient } from "./types";

export interface PatientRepository extends Repository<Patient> {
  search(term: string): Promise<Patient[]>;
}

export class LocalPatientRepository extends LocalCollectionRepository<Patient> implements PatientRepository {
  constructor() {
    super("patients", seedPatients, "pac");
  }

  async search(term: string): Promise<Patient[]> {
    const all = await this.list();
    return all.filter((p) => matchesSearch(term, p.name, p.phone, p.cpf, p.email));
  }
}
