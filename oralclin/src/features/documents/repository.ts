import { LocalCollectionRepository } from "@/repositories/core/local-repository";
import type { Repository } from "@/repositories/core/repository";
import type { PatientDocument } from "./types";

export interface DocumentRepository extends Repository<PatientDocument> {
  listByPatient(patientId: string): Promise<PatientDocument[]>;
}

export class LocalDocumentRepository extends LocalCollectionRepository<PatientDocument> implements DocumentRepository {
  constructor() {
    super("documents", () => [], "doc");
  }

  async listByPatient(patientId: string): Promise<PatientDocument[]> {
    return (await this.list()).filter((d) => d.patientId === patientId);
  }
}
