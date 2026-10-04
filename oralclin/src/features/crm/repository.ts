import { LocalCollectionRepository } from "@/repositories/core/local-repository";
import type { Repository } from "@/repositories/core/repository";
import { seedLeads } from "@/data/seed";
import type { Lead } from "./types";

export type LeadRepository = Repository<Lead>;

export class LocalLeadRepository extends LocalCollectionRepository<Lead> implements LeadRepository {
  constructor() {
    super("leads", seedLeads, "lead");
  }
}
