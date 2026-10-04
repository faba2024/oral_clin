import Image from "next/image";
import type { TreatmentCategory } from "@/features/treatments/types";
import { cn } from "@/utils/cn";

const ART: Record<TreatmentCategory, React.ReactNode> = {
  estetica: (
    <g>
      <path d="M60 46c-9-6-24-4-27 9-3 12 3 20 6 32 3 11 4 25 12 25 7 0 6-17 9-22 3 5 2 22 9 22 8 0 9-14 12-25 3-12 9-20 6-32-3-13-18-15-27-9Z" />
      <path d="M86 30l2.6 6.4L95 39l-6.4 2.6L86 48l-2.6-6.4L77 39l6.4-2.6Z" />
      <path d="M98 54l1.4 3.6L103 59l-3.6 1.4L98 64l-1.4-3.6L93 59l3.6-1.4Z" />
    </g>
  ),
  implantes: (
    <g>
      <path d="M44 40c0-8 7-12 16-12s16 4 16 12c0 6-3 10-4 14H48c-1-4-4-8-4-14Z" />
      <path d="M50 54h20M52 62h16M52 70h16M53 78h14M54 86h12M56 94h8M60 102v6" />
      <path d="M52 62l16 8M52 70l16 8M53 78l14 8" opacity=".5" />
    </g>
  ),
  ortodontia: (
    <g>
      <path d="M22 74c10-22 66-22 76 0" />
      <path d="M26 82c10-18 58-18 68 0" opacity=".55" />
      {[32, 44, 56, 68, 80].map((x, i) => (
        <rect key={x} x={x} y={i === 0 || i === 4 ? 62 : 56 + Math.abs(2 - i) * 2} width="8" height="8" rx="2" />
      ))}
    </g>
  ),
  reabilitacao: (
    <g>
      <path d="M30 58c0-10 8-16 15-12 4 2 7 2 11 0 7-4 15 2 15 12" />
      <path d="M49 58c0-10 8-16 15-12 4 2 7 2 11 0 7-4 15 2 15 12" />
      <path d="M28 58h64v10c0 6-5 10-11 10H39c-6 0-11-4-11-10Z" />
      <path d="M38 86h44" opacity=".5" />
    </g>
  ),
  prevencao: (
    <g>
      <path d="M60 28l26 10v22c0 18-12 30-26 36-14-6-26-18-26-36V38Z" />
      <path d="M48 62l8 8 16-17" />
    </g>
  ),
  endodontia: (
    <g>
      <path d="M60 30c-10-6-26-3-28 10-2 11 4 17 6 28 2 12 5 30 12 30 6 0 6-18 10-24 4 6 4 24 10 24 7 0 10-18 12-30 2-11 8-17 6-28-2-13-18-16-28-10Z" />
      <path d="M52 52c0 14 1 30 2 38M68 52c0 14-1 30-2 38" opacity=".55" />
    </g>
  ),
  periodontia: (
    <g>
      <path d="M24 66c12-8 24-8 36 0s24 8 36 0" />
      <path d="M40 66V48c0-7 4-12 10-12s10 5 10 12v18M60 66V48c0-7 4-12 10-12s10 5 10 12v18" />
      <path d="M24 78c12-8 24-8 36 0s24 8 36 0" opacity=".5" />
    </g>
  ),
  harmonizacao: (
    <g>
      <path d="M60 22c-18 0-30 16-30 36 0 24 14 42 30 42s30-18 30-42c0-20-12-36-30-36Z" />
      <path d="M46 78c8 6 20 6 28 0" />
      <path d="M44 52h8M68 52h8" opacity=".6" />
    </g>
  ),
};

/** Variações por tratamento para evitar ilustrações repetidas na mesma categoria. */
const ART_BY_SLUG: Record<string, React.ReactNode> = {
  clareamento: (
    <g>
      <circle cx="60" cy="62" r="16" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180;
        return <path key={a} d={`M${60 + Math.cos(r) * 24} ${62 + Math.sin(r) * 24} L${60 + Math.cos(r) * 32} ${62 + Math.sin(r) * 32}`} />;
      })}
    </g>
  ),
  "lentes-de-contato-dental": (
    <g>
      <path d="M44 34c10-4 22-4 32 0v44c0 14-7 26-16 26s-16-12-16-26Z" />
      <path d="M50 38c7-2 13-2 20 0v38c0 10-4 20-10 20s-10-10-10-20Z" opacity=".55" />
    </g>
  ),
  restauracao: (
    <g>
      <path d="M60 46c-9-6-24-4-27 9-3 12 3 20 6 32 3 11 4 25 12 25 7 0 6-17 9-22 3 5 2 22 9 22 8 0 9-14 12-25 3-12 9-20 6-32-3-13-18-15-27-9Z" />
      <path d="M52 58c4-3 12-3 16 0l-2 8h-12Z" />
    </g>
  ),
  "alinhadores-invisiveis": (
    <g>
      <path d="M24 70c8-24 64-24 72 0" />
      <path d="M28 76c8-20 56-20 64 0" opacity=".5" />
      <path d="M24 70c2 6 6 8 10 6M96 70c-2 6-6 8-10 6" />
    </g>
  ),
};

interface Props {
  slug?: string;
  category: TreatmentCategory;
  name: string;
  image?: string | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/** Imagem do tratamento; na ausência, composição gráfica própria da marca. */
export function TreatmentVisual({ slug, category, name, image, className, sizes = "(max-width: 768px) 100vw, 400px", priority }: Props) {
  if (image) {
    return (
      <div className={cn("relative overflow-hidden bg-sand", className)}>
        <Image src={image} alt={name} fill sizes={sizes} className="object-cover" priority={priority} unoptimized={image.startsWith("data:")} />
      </div>
    );
  }
  return (
    <div className={cn("grain relative overflow-hidden bg-gradient-to-br from-sand via-ivory to-[#efe7d8]", className)} role="img" aria-label={name}>
      <svg viewBox="0 0 120 120" className="absolute left-1/2 top-1/2 h-[64%] -translate-x-1/2 -translate-y-1/2 text-gold" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="60" cy="64" r="54" stroke="#D6C39C" strokeWidth=".6" opacity=".7" />
        {(slug && ART_BY_SLUG[slug]) || ART[category]}
      </svg>
      <span className="absolute bottom-3 left-4 font-serif text-[13px] italic text-gold-dark/70">{name}</span>
    </div>
  );
}
