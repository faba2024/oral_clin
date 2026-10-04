import { LocalSingletonRepository } from "@/repositories/core/local-repository";
import type { SingletonRepository } from "@/repositories/core/repository";
import { seedSettings } from "@/data/seed";
import type { ClinicSettings } from "./types";

export type SettingsRepository = SingletonRepository<ClinicSettings>;

export class LocalSettingsRepository extends LocalSingletonRepository<ClinicSettings> implements SettingsRepository {
  constructor() {
    super("settings", seedSettings);
  }
}
