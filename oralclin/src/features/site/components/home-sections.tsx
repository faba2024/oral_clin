"use client";

import { ArrowRight, ArrowUpRight, CalendarCheck, ClipboardCheck, MapPin, Quote, Smile, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SectionHeading } from "@/components/site/section-heading";
import { TreatmentVisual } from "@/components/shared/treatment-visual";
import { buttonVariants } from "@/components/ui/button";
import { BeforeAfterSlider } from "@/features/before-after/components/before-after-slider";
import { RESULT_DISCLAIMER } from "@/features/before-after/service";
import { cn } from "@/utils/cn";
import { formatPhone } from "@/utils/format";
import { whatsappLink } from "@/utils/whatsapp";
import { usePublicCases, usePublicProfessionals, usePublicTreatments, useSiteContent } from "../hooks";
import { ProfessionalPortrait } from "./professional-portrait";

export function TreatmentsShowcase() {
  const treatments = usePublicTreatments();
  const featured = treatments.filter((t) => t.featured).slice(0, 6);
  const list = featured.length >= 3 ? featured : treatments.slice(0, 6);
  return (
    <section className="bg-white py-24 sm:py-32" aria-labelledby="sec-tratamentos">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Tratamentos"
          title={<span id="sec-tratamentos">Cuidado completo, do essencial ao estético.</span>}
          action={
            <Link href="/tratamentos" className="group inline-flex items-center gap-2 text-[14px] font-medium text-ink">
              Todos os tratamentos <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t, i) => (
            <li key={t.id}>
              <Link href={`/tratamentos/${t.slug}`} className="group block">
                <div className="overflow-hidden rounded-[22px]">
                  <TreatmentVisual slug={t.slug} category={t.category} name={t.name} image={t.image} className="aspect-[4/3] transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold tabular tracking-[0.2em] text-gold-dark">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1.5 font-serif text-[24px] leading-tight">{t.name}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{t.shortDescription}</p>
                  </div>
                  <span className="mt-6 flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <span className="mt-3 inline-block text-[13px] font-medium text-ink underline decoration-champagne underline-offset-4 group-hover:decoration-gold">Conhecer tratamento</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Journey() {
  const steps = [
    { icon: <ClipboardCheck />, title: "Avaliação sem pressa", text: "Escuta, exame clínico completo e fotografias. Entendemos o que você deseja." },
    { icon: <Smile />, title: "Planejamento digital", text: "Simulação do sorriso e plano transparente, com etapas, prazos e valores." },
    { icon: <CalendarCheck />, title: "Tratamento acompanhado", text: "Especialistas em cada fase e retornos programados para cuidar do resultado." },
  ];
  return (
    <section className="bg-ivory py-24 sm:py-28" aria-labelledby="sec-jornada">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading align="center" eyebrow="Como funciona" title={<span id="sec-jornada">Uma jornada clara, do primeiro contato ao novo sorriso.</span>} />
        <ol className="mt-16 grid gap-px overflow-hidden rounded-[24px] bg-line md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-ivory p-8 sm:p-10">
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-full bg-white text-gold-dark ring-1 ring-line [&_svg]:size-5">{s.icon}</span>
                <span className="font-serif text-[40px] italic leading-none text-champagne">{i + 1}</span>
              </div>
              <h3 className="mt-8 text-[18px] font-semibold">{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function BeforeAfterShowcase() {
  const cases = usePublicCases();
  const [active, setActive] = useState(0);
  if (!cases.length) return null;
  const current = cases[Math.min(active, cases.length - 1)];
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 text-white sm:py-32" aria-labelledby="sec-resultados">
      <div className="relative mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow text-champagne">Antes e depois</p>
          <h2 id="sec-resultados" className="mt-4 text-balance font-serif text-[36px] leading-[1.1] sm:text-[48px]">
            Resultados que respeitam a sua naturalidade.
          </h2>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-white/60">Arraste o controle sobre a imagem para comparar. Cada caso é planejado de forma individual.</p>
          <ul className="mt-8 space-y-2">
            {cases.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={cn(
                    "flex w-full items-center justify-between rounded-[14px] border px-4 py-3.5 text-left transition-colors",
                    i === active ? "border-champagne/60 bg-white/[0.06]" : "border-white/10 hover:border-white/25",
                  )}
                >
                  <span>
                    <span className="block text-[14.5px] font-medium">{c.title}</span>
                    <span className="block text-[12.5px] text-white/50">{c.patientLabel}</span>
                  </span>
                  <span className={cn("size-2 rounded-full", i === active ? "bg-champagne" : "bg-white/20")} />
                </button>
              </li>
            ))}
          </ul>
          <Link href="/antes-e-depois" className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-champagne hover:text-white">
            Ver galeria completa <ArrowRight className="size-4" />
          </Link>
        </div>
        <div>
          <BeforeAfterSlider key={current.id} before={current.beforeImage} after={current.afterImage} alt={current.title} aspect="aspect-[4/3]" className="rounded-[22px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]" />
          <p className="mt-4 text-[12px] text-white/45">{RESULT_DISCLAIMER}</p>
        </div>
      </div>
    </section>
  );
}

export function ProfessionalsShowcase() {
  const professionals = usePublicProfessionals();
  return (
    <section className="bg-white py-24 sm:py-32" aria-labelledby="sec-equipe">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Especialistas"
          title={<span id="sec-equipe">Uma equipe que conversa entre si — e com você.</span>}
          action={
            <Link href="/profissionais" className="group inline-flex items-center gap-2 text-[14px] font-medium">
              Conhecer a equipe <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {professionals.map((p) => (
            <li key={p.id}>
              <ProfessionalPortrait professional={p} />
              <h3 className="mt-5 font-serif text-[22px]">
                {p.title} {p.name}
              </h3>
              <p className="text-[13px] font-medium text-gold-dark">{p.specialty}</p>
              <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-muted">{p.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ClinicShowcase() {
  const c = useSiteContent();
  return (
    <section className="bg-sand/60 py-24 sm:py-32" aria-labelledby="sec-clinica">
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-[460px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
            <Image src={c.clinicImage} alt="Estrutura da Oralclin" fill sizes="(max-width: 1024px) 90vw, 460px" className="object-cover" unoptimized={c.clinicImage.startsWith("data:")} />
          </div>
          <div className="absolute -bottom-6 -right-2 rounded-[18px] bg-white p-5 shadow-[var(--shadow-pop)] sm:-right-8">
            <p className="font-serif text-[34px] leading-none text-gold-dark">{c.clinicStats[0]?.value}</p>
            <p className="mt-1 max-w-[140px] text-[12px] text-muted">{c.clinicStats[0]?.label}</p>
          </div>
        </div>
        <div>
          <p className="eyebrow">A clínica</p>
          <h2 id="sec-clinica" className="mt-4 text-balance font-serif text-[36px] leading-[1.1] sm:text-[46px]">
            {c.clinicTitle}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">{c.clinicText}</p>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line-strong/60 pt-8">
            {c.clinicStats.map((s) => (
              <div key={s.id}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-serif text-[30px] leading-none sm:text-[38px]">{s.value}</span>
                  <span className="mt-2 block text-[12.5px] leading-snug text-muted">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <Link href="/clinica" className={buttonVariants({ variant: "secondary", size: "lg", className: "mt-10 rounded-full" })}>
            Conheça a estrutura
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const c = useSiteContent();
  const list = c.testimonials.filter((t) => t.published && t.text.trim()).slice(0, 3);
  if (!list.length) return null;
  return (
    <section className="bg-white py-24 sm:py-32" aria-labelledby="sec-depoimentos">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading align="center" eyebrow="Depoimentos" title={<span id="sec-depoimentos">O que dizem nossos pacientes.</span>} />
        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {list.map((t) => (
            <li key={t.id} className="flex flex-col rounded-[22px] border border-line bg-ivory p-8">
              <Quote className="size-7 text-champagne" aria-hidden />
              <blockquote className="mt-5 flex-1 font-serif text-[19px] leading-relaxed text-ink">“{t.text}”</blockquote>
              <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
                <div>
                  <p className="text-[14px] font-semibold">{t.name}</p>
                  <p className="text-[12.5px] text-muted">{t.treatment}</p>
                </div>
                <div className="flex gap-0.5 text-gold" aria-label={`${t.rating} de 5 estrelas`}>
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FinalCta() {
  const c = useSiteContent();
  return (
    <section className="bg-ivory py-24 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grain relative overflow-hidden rounded-[32px] bg-ink px-6 py-16 text-center text-white sm:px-16 sm:py-24">
          <svg className="pointer-events-none absolute left-1/2 top-1/2 size-[720px] -translate-x-1/2 -translate-y-1/2 text-champagne opacity-15" viewBox="0 0 200 200" fill="none" aria-hidden>
            <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="0.4" />
            <circle cx="100" cy="100" r="64" stroke="currentColor" strokeWidth="0.4" />
          </svg>
          <p className="eyebrow relative text-champagne">Agende sua avaliação</p>
          <h2 className="relative mx-auto mt-5 max-w-2xl text-balance font-serif text-[38px] leading-[1.08] sm:text-[56px]">{c.ctaTitle}</h2>
          <p className="relative mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-white/60">{c.ctaText}</p>
          <div className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/agendar" className={buttonVariants({ variant: "gold", size: "xl", className: "rounded-full px-8" })}>
              Agendar online <ArrowRight />
            </Link>
            <a
              href={whatsappLink(c.whatsapp, "Olá! Gostaria de agendar uma avaliação.")}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "secondary", size: "xl", className: "rounded-full border-white/20 bg-transparent px-8 text-white hover:bg-white/10" })}
            >
              WhatsApp {formatPhone(c.whatsapp)}
            </a>
          </div>
          <p className="relative mt-8 flex items-center justify-center gap-1.5 text-[12.5px] text-white/45">
            <MapPin className="size-3.5" /> {c.address}
            {c.city ? ` — ${c.city}` : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
