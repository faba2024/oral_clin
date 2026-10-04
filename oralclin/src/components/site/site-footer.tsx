"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/shared/brand";
import { InstagramIcon, WhatsappIcon } from "@/components/shared/social-icons";
import { usePublicTreatments, useSiteContent } from "@/features/site/hooks";
import { formatPhone } from "@/utils/format";
import { whatsappLink } from "@/utils/whatsapp";

export function SiteFooter() {
  const content = useSiteContent();
  const treatments = usePublicTreatments().filter((t) => t.featured).slice(0, 5);
  return (
    <footer className="grain relative overflow-hidden bg-ink text-white">
      <div className="mx-auto max-w-[1240px] px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="light" logoUrl={content.logo} />
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-white/55">{content.brandTagline}. Estrutura completa, especialistas e planejamento personalizado para cada sorriso.</p>
            <div className="mt-6 flex gap-2">
              <a href={`https://instagram.com/${content.instagram}`} target="_blank" rel="noreferrer" aria-label="Instagram da Oralclin" className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-champagne hover:text-champagne">
                <InstagramIcon className="size-[18px]" />
              </a>
              <a href={whatsappLink(content.whatsapp, "Olá! Gostaria de agendar uma avaliação.")} target="_blank" rel="noreferrer" aria-label="WhatsApp da Oralclin" className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-champagne hover:text-champagne">
                <WhatsappIcon className="size-[18px]" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-champagne">Navegação</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-white/70">
              {[
                ["/tratamentos", "Tratamentos"],
                ["/antes-e-depois", "Antes e Depois"],
                ["/profissionais", "Profissionais"],
                ["/clinica", "A clínica"],
                ["/contato", "Contato"],
                ["/agendar", "Agendar avaliação"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-champagne">Tratamentos</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-white/70">
              {treatments.map((t) => (
                <li key={t.id}>
                  <Link href={`/tratamentos/${t.slug}`} className="transition-colors hover:text-white">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-champagne">Contato</p>
            <ul className="mt-4 space-y-3 text-[13.5px] text-white/70">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-champagne" />
                <a href={content.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-white">
                  {content.address}
                  {content.city ? ` — ${content.city}` : ""}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-champagne" />
                <a href={`tel:+55${content.phone}`} className="hover:text-white">
                  {formatPhone(content.phone)}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-champagne" />
                <a href={`mailto:${content.email}`} className="hover:text-white">
                  {content.email}
                </a>
              </li>
              {content.hours.map((h) => (
                <li key={h.id} className="flex gap-2.5">
                  <Clock className="mt-0.5 size-4 shrink-0 text-champagne" />
                  <span>
                    {h.label}: {h.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {content.brandName}. Todos os direitos reservados.
          </p>
          <p>Responsável técnico conforme registro no CRO. Resultados podem variar conforme cada paciente.</p>
        </div>
      </div>
    </footer>
  );
}
