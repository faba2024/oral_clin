import { LocalSingletonRepository } from "@/repositories/core/local-repository";
import type { SingletonRepository } from "@/repositories/core/repository";
import { seedSiteContent } from "@/data/seed";
import type { SiteContent } from "./types";

export type SiteContentRepository = SingletonRepository<SiteContent>;

export class LocalSiteContentRepository extends LocalSingletonRepository<SiteContent> implements SiteContentRepository {
  constructor() {
    super("site-content", seedSiteContent);
  }
}
