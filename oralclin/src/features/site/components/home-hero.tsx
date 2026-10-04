"use client";

import { ArrowRight, Check, ScanFace } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useSiteContent } from "../hooks";

export function HomeHero() {
  const c = useSiteContent();
  return (
    <section className="grain relative overflow-hidden bg-ivory pt-[72px]">
      <svg className="pointer-events-none absolute -left-40 top-24 size-[680px] text-champagne opacity-40" viewBox="0 0 200 200" fill="none" aria-hidden>
        <circle cx="100" cy="100" r="99" stroke="currentColor" strokeWidth="0.3" />
        <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="0.3" />
      </svg>
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pb-28 lg:pt-20">
        <div>
          <p className="eyebrow animate-rise">{c.heroEyebrow}</p>
          <h1 className="mt-6 animate-rise text-balance font-serif text-[46px] leading-[1.02] tracking-[-0.02em] text-ink [animation-delay:80ms] sm:text-[64px] lg:text-[76px]">
            {c.heroTitle}
          </h1>
          <p className="mt-7 max-w-lg animate-rise text-[17px] leading-relaxed text-muted [animation-delay:160ms]">{c.heroSubtitle}</p>
          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <Link href="/agendar" className={buttonVariants({ size: "xl", className: "rounded-full px-7" })}>
              Agendar avaliação <ArrowRight />
            </Link>
            <Link href="/tratamentos" className={buttonVariants({ variant: "secondary", size: "xl", className: "rounded-full px-7" })}>
              Conhecer tratamentos
            </Link>
          </div>
          <ul className="mt-10 grid animate-rise gap-3 [animation-delay:320ms] sm:grid-cols-3">
            {c.heroHighlights.filter(Boolean).map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink-2">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-champagne text-gold-dark">
                  <Check className="size-3" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[440px] animate-rise [animation-delay:200ms]">
          <div className="absolute -inset-4 rounded-t-[999px] rounded-b-[32px] border border-champagne/70" aria-hidden />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-sand shadow-[0_40px_80px_-40px_rgba(32,32,32,0.45)]">
            <Image src={c.heroImage} alt="Fachada da clínica Oralclin" fill priority sizes="(max-width: 1024px) 90vw, 440px" className="object-cover" unoptimized={c.heroImage.startsWith("data:")} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
          </div>
          <div className="absolute -left-4 bottom-10 max-w-[230px] rounded-[18px] border border-line bg-white/95 p-4 shadow-[var(--shadow-pop)] backdrop-blur sm:-left-10">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-gold-soft text-gold-dark">
                <ScanFace className="size-5" />
              </span>
              <div>
                <p className="text-[13px] font-semibold leading-tight">Planejamento digital</p>
                <p className="text-[11.5px] leading-snug text-muted">Veja o resultado antes de começar</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-2 top-14 rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-white shadow-[var(--shadow-pop)] sm:-right-8">
            Agendamento <span className="text-champagne">online</span>
          </div>
        </div>
      </div>
    </section>
  );
}
