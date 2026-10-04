import { LocalCollectionRepository } from "@/repositories/core/local-repository";
import type { Repository } from "@/repositories/core/repository";
import { seedBeforeAfter } from "@/data/seed";
import type { BeforeAfterCase } from "./types";

export type BeforeAfterRepository = Repository<BeforeAfterCase>;

export class LocalBeforeAfterRepository extends LocalCollectionRepository<BeforeAfterCase> implements BeforeAfterRepository {
  constructor() {
    super("before-after", seedBeforeAfter, "ba");
  }
}
