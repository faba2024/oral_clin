"use client";

import { useMemo } from "react";
import { seedBeforeAfter, seedProfessionals, seedSiteContent, seedTreatments } from "@/data/seed";
import { usePublishedCases } from "@/features/before-after/hooks";
import { useSiteContentQuery } from "@/features/content/hooks";
import { useProfessionals } from "@/features/professionals/hooks";
import { useSettings } from "@/features/settings/hooks";
import { useTreatments } from "@/features/treatments/hooks";

/**
 * Hooks do site público. Renderizam primeiro com o conteúdo padrão (SSR/SEO)
 * e trocam pelo conteúdo do CMS assim que o navegador carrega os dados.
 */
export function useSiteContent() {
  const { data } = useSiteContentQuery();
  return useMemo(() => data ?? seedSiteContent(), [data]);
}

export function usePublicTreatments() {
  const { data } = useTreatments();
  return useMemo(() => (data ?? seedTreatments()).filter((t) => t.active).sort((a, b) => a.order - b.order), [data]);
}

export function usePublicProfessionals() {
  const { data } = useProfessionals();
  return useMemo(() => (data ?? seedProfessionals()).filter((p) => p.status === "ativo" && p.showOnSite), [data]);
}

export function usePublicCases() {
  const { data } = usePublishedCases();
  return useMemo(() => data ?? seedBeforeAfter().filter((c) => c.published), [data]);
}

export function useOnlineBookingEnabled() {
  const { data } = useSettings();
  return data?.agenda.allowOnlineBooking ?? true;
}
