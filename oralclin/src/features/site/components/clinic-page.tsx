"use client";

import { Clock, Cpu, HeartHandshake, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useSiteContent } from "../hooks";

const VALUES = [
  { icon: <HeartHandshake />, title: "Atendimento humano", text: "Tempo para ouvir, explicar e decidir junto com você." },
  { icon: <Cpu />, title: "Tecnologia digital", text: "Escaneamento intraoral, planejamento e simulação do sorriso." },
  { icon: <ShieldCheck />, title: "Biossegurança", text: "Protocolos rigorosos de esterilização e rastreabilidade." },
  { icon: <Sparkles />, title: "Odontologia integrada", text: "Especialistas que trabalham em conjunto em cada caso." },
];

export function ClinicPage() {
  const c = useSiteContent();
  return (
    <>
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[28px] bg-sand">
            <Image src={c.clinicImage} alt="Fachada da Oralclin" fill sizes="(max-width: 1024px) 90vw, 460px" className="object-cover" unoptimized={c.clinicImage.startsWith("data:")} />
          </div>
          <div>
            <h2 className="text-balance font-serif text-[36px] leading-[1.1] sm:text-[44px]">{c.clinicTitle}</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-muted">{c.clinicText}</p>
            <dl className="mt-10 grid grid-cols-3 gap-4">
              {c.clinicStats.map((s) => (
                <div key={s.id} className="rounded-[18px] border border-line bg-ivory p-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-serif text-[30px] leading-none">{s.value}</span>
                    <span className="mt-2 block text-[12px] leading-snug text-muted">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <p className="eyebrow">Nossos princípios</p>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-[24px] bg-line sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <li key={v.title} className="bg-ivory p-8">
                <span className="flex size-11 items-center justify-center rounded-full bg-white text-gold-dark ring-1 ring-line [&_svg]:size-5">{v.icon}</span>
                <h3 className="mt-6 text-[16px] font-semibold">{v.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Visite a clínica</p>
            <h2 className="mt-4 font-serif text-[36px] leading-tight">Estamos esperando por você.</h2>
            <ul className="mt-8 space-y-5 text-[15px]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-gold-dark" />
                <span>
                  {c.address}
                  {c.city ? <span className="block text-muted">{c.city}</span> : null}
                </span>
              </li>
              {c.hours.map((h) => (
                <li key={h.id} className="flex gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-gold-dark" />
                  <span>
                    <span className="font-medium">{h.label}</span> <span className="text-muted">· {h.hours}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/agendar" className={buttonVariants({ size: "lg", className: "rounded-full px-7" })}>
                Agendar avaliação
              </Link>
              <a href={c.mapsUrl} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "secondary", size: "lg", className: "rounded-full px-7" })}>
                Abrir no mapa
              </a>
            </div>
          </div>
          <a
            href={c.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="grain group relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[28px] bg-sand"
            aria-label="Ver localização no Google Maps"
          >
            <svg className="absolute inset-0 h-full w-full text-line-strong" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
              <path d="M0 80h400M0 190h400M120 0v300M280 0v300M0 260L400 40" stroke="currentColor" strokeWidth="10" opacity=".55" />
              <path d="M0 140h400M200 0v300" stroke="currentColor" strokeWidth="3" opacity=".5" />
            </svg>
            <span className="relative flex flex-col items-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-ink text-champagne shadow-[var(--shadow-pop)] transition-transform group-hover:-translate-y-1">
                <MapPin className="size-6" />
              </span>
              <span className="mt-3 rounded-full bg-white px-4 py-1.5 text-[13px] font-medium shadow">Oralclin · Ver rotas</span>
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
