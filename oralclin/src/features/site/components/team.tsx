"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { WEEKDAY_SHORT } from "@/features/professionals/types";
import { usePublicProfessionals, usePublicTreatments } from "../hooks";
import { ProfessionalPortrait } from "./professional-portrait";

export function TeamGrid() {
  const professionals = usePublicProfessionals();
  const treatments = usePublicTreatments();
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {professionals.map((p) => (
            <li key={p.id} className="flex flex-col">
              <ProfessionalPortrait professional={p} />
              <h2 className="mt-6 font-serif text-[26px]">
                {p.title} {p.name}
              </h2>
              <p className="text-[13.5px] font-medium text-gold-dark">{p.specialty}</p>
              <p className="mt-0.5 text-[12px] text-subtle">{p.cro}</p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted">{p.bio}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.treatmentIds
                  .map((id) => treatments.find((t) => t.id === id))
                  .filter((t) => t && t.slug !== "avaliacao")
                  .map((t) => (
                    <Link key={t!.id} href={`/tratamentos/${t!.slug}`} className="rounded-full border border-line px-3 py-1 text-[12px] text-ink-2 transition-colors hover:border-gold hover:text-gold-dark">
                      {t!.name}
                    </Link>
                  ))}
              </div>
              <p className="mt-4 text-[12px] text-subtle">Atende: {p.workingHours.map((h) => WEEKDAY_SHORT[h.weekday]).join(", ")}</p>
              <Link href={`/agendar?profissional=${p.id}`} className={buttonVariants({ variant: "secondary", className: "mt-6 self-start rounded-full" })}>
                Agendar com {p.title} {p.name.split(" ")[0]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
