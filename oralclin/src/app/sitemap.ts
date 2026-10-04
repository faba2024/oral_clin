import type { MetadataRoute } from "next";
import { seedTreatments } from "@/data/seed";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oralclin.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/tratamentos", "/antes-e-depois", "/profissionais", "/clinica", "/contato", "/agendar"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const treatments = seedTreatments().map((t) => ({
    url: `${SITE_URL}/tratamentos/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...treatments];
}
