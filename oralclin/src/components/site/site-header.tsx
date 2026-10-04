"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/shared/brand";
import { buttonVariants } from "@/components/ui/button";
import { useSiteContent } from "@/features/site/hooks";
import { cn } from "@/utils/cn";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/tratamentos", label: "Tratamentos" },
  { href: "/antes-e-depois", label: "Antes e Depois" },
  { href: "/profissionais", label: "Profissionais" },
  { href: "/clinica", label: "Clínica" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const content = useSiteContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-300", scrolled || open ? "bg-ivory/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-transparent")}>
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label="Oralclin — página inicial">
          <Logo logoUrl={content.logo} />
        </Link>
        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                isActive(l.href) ? "text-ink" : "text-muted hover:text-ink",
              )}
            >
              {l.label}
              {isActive(l.href) ? <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gold" /> : null}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/agendar" className={buttonVariants({ variant: "primary", size: "md", className: "hidden rounded-full px-5 sm:inline-flex" })}>
            Agendar avaliação
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex size-10 items-center justify-center rounded-full text-ink hover:bg-sand lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="menu-mobile" className="h-[calc(100dvh-72px)] animate-fade-in overflow-y-auto border-t border-line bg-ivory px-5 pb-10 pt-6 lg:hidden">
          <nav aria-label="Menu mobile" className="flex flex-col">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn("border-b border-line py-4 font-serif text-[26px] transition-colors", isActive(l.href) ? "text-gold-dark" : "text-ink")}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/agendar" className={buttonVariants({ variant: "primary", size: "xl", className: "mt-8 w-full rounded-full" })}>
            Agendar avaliação
          </Link>
        </div>
      ) : null}
    </header>
  );
}
