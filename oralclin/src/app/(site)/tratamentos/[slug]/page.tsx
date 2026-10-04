import type { Metadata } from "next";
import { seedTreatments } from "@/data/seed";
import { TreatmentDetail } from "@/features/site/components/treatment-detail";

export function generateStaticParams() {
  return seedTreatments().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = seedTreatments().find((x) => x.slug === slug);
  if (!t) return { title: "Tratamento" };
  return {
    title: t.name,
    description: `${t.shortDescription} ${t.description.slice(0, 110)}…`,
    alternates: { canonical: `/tratamentos/${t.slug}` },
    openGraph: { title: `${t.name} | Oralclin`, description: t.shortDescription },
  };
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const initial = seedTreatments().find((t) => t.slug === slug) ?? null;
  return <TreatmentDetail slug={slug} initial={initial} />;
}
