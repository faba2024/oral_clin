"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TreatmentVisual } from "@/components/shared/treatment-visual";
import { TREATMENT_CATEGORY_LABELS, type TreatmentCategory } from "@/features/treatments/types";
import { cn } from "@/utils/cn";
import { formatMinutes } from "@/utils/format";
import { usePublicTreatments } from "../hooks";

export function TreatmentsCatalog() {
  const treatments = usePublicTreatments();
  const [category, setCategory] = useState<TreatmentCategory | "todos">("todos");
  const categories = [...new Set(treatments.map((t) => t.category))];
  const list = treatments.filter((t) => category === "todos" || t.category === category);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="scrollbar-thin -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filtrar por categoria">
          {(["todos", ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors",
                category === c ? "border-ink bg-ink text-white" : "border-line text-ink-2 hover:border-ink",
              )}
            >
              {c === "todos" ? "Todos" : TREATMENT_CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
        <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <li key={t.id}>
              <Link href={`/tratamentos/${t.slug}`} className="group block">
                <div className="overflow-hidden rounded-[22px]">
                  <TreatmentVisual slug={t.slug} category={t.category} name={t.name} image={t.image} className="aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">{TREATMENT_CATEGORY_LABELS[t.category]}</p>
                <div className="mt-1.5 flex items-start justify-between gap-3">
                  <h2 className="font-serif text-[24px] leading-tight">{t.name}</h2>
                  <ArrowUpRight className="mt-1.5 size-5 shrink-0 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{t.shortDescription}</p>
                <p className="mt-3 flex items-center gap-1.5 text-[12.5px] text-subtle">
                  <Clock className="size-3.5" /> {formatMinutes(t.durationMinutes)} por sessão · {t.sessions}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
