import Image from "next/image";
import type { Professional } from "@/features/professionals/types";
import { cn } from "@/utils/cn";
import { initials } from "@/utils/format";

/** Retrato do profissional; sem foto, exibe um monograma editorial. */
export function ProfessionalPortrait({ professional, className }: { professional: Professional; className?: string }) {
  if (professional.photo) {
    return (
      <div className={cn("relative aspect-[4/5] overflow-hidden rounded-[22px] bg-sand", className)}>
        <Image src={professional.photo} alt={`${professional.title} ${professional.name}`} fill sizes="(max-width: 768px) 90vw, 380px" className="object-cover" unoptimized={professional.photo.startsWith("data:")} />
      </div>
    );
  }
  return (
    <div className={cn("grain relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[22px] bg-gradient-to-b from-sand to-[#ebe3d3]", className)} role="img" aria-label={`${professional.title} ${professional.name}`}>
      <svg className="absolute inset-0 h-full w-full text-champagne" viewBox="0 0 100 125" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path d="M50 22c-14 0-22 10-22 24s8 26 22 26 22-12 22-26-8-24-22-24Z" stroke="currentColor" strokeWidth="0.5" />
        <path d="M14 125c2-26 17-40 36-40s34 14 36 40" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <span className="relative font-serif text-[64px] italic tracking-tight" style={{ color: professional.color }}>
        {initials(professional.name)}
      </span>
      <span className="absolute bottom-4 left-4 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium text-ink-2 backdrop-blur">{professional.cro}</span>
    </div>
  );
}
