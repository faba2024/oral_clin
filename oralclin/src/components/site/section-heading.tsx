import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface Props {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}

export function SectionHeading({ eyebrow, title, description, align = "left", className, action }: Props) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", align === "center" && "items-center text-center md:flex-col md:items-center", className)}>
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 text-balance font-serif text-[34px] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[44px]">{title}</h2>
        {description ? <p className="mt-4 text-[15.5px] leading-relaxed text-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-ivory pb-16 pt-36 sm:pb-20 sm:pt-44">
      <svg className="pointer-events-none absolute -right-32 -top-24 size-[520px] text-champagne opacity-50" viewBox="0 0 200 200" fill="none" aria-hidden>
        <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="0.35" />
        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.35" />
      </svg>
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl animate-rise text-balance font-serif text-[42px] leading-[1.05] tracking-[-0.015em] [animation-delay:60ms] sm:text-[60px]">{title}</h1>
        {description ? <p className="mt-6 max-w-xl animate-rise text-[16px] leading-relaxed text-muted [animation-delay:120ms]">{description}</p> : null}
        {children}
      </div>
    </section>
  );
}
