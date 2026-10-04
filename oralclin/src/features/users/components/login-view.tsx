"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Logo } from "@/components/shared/brand";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { authService } from "@/features/users/service";
import { USER_ROLE_LABELS, type UserRole } from "@/features/users/types";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/utils/cn";

const schema = z.object({
  email: z.string().min(1, "Informe seu e-mail").email("E-mail inválido"),
  password: z.string().min(1, "Informe sua senha"),
});

type FormValues = z.infer<typeof schema>;

const DEMO_PROFILES: { role: UserRole; email: string; password: string }[] = [
  { role: "admin", email: "admin@oralclin.com", password: "admin123" },
  { role: "recepcao", email: "recepcao@oralclin.com", password: "demo123" },
  { role: "dentista", email: "camila.andrade@oralclin.com", password: "demo123" },
  { role: "financeiro", email: "financeiro@oralclin.com", password: "demo123" },
  { role: "comercial", email: "comercial@oralclin.com", password: "demo123" },
];

export function LoginView() {
  const router = useRouter();
  const params = useSearchParams();
  const signIn = useAuthStore((s) => s.signIn);
  const user = useAuthStore((s) => s.user);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Destino capturado uma única vez: evita redirecionar duas vezes durante a troca de rota.
  const [destination] = useState(() => {
    const next = params.get("next");
    return next && next.startsWith("/admin") && !next.startsWith("/admin/login") ? next : "/admin";
  });
  const redirected = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: "", password: "" } });

  useEffect(() => {
    if (!user || redirected.current) return;
    redirected.current = true;
    router.replace(destination);
  }, [user, router, destination]);

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      const session = await authService.login(values.email, values.password);
      signIn(session);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível entrar.");
    }
  };

  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      <aside className="grain relative hidden overflow-hidden bg-ink text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <svg className="pointer-events-none absolute -right-40 -top-40 size-[640px] opacity-[0.16]" viewBox="0 0 200 200" aria-hidden>
          <circle cx="100" cy="100" r="98" fill="none" stroke="#D6C39C" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="74" fill="none" stroke="#D6C39C" strokeWidth="0.4" />
          <path d="M150 60A60 60 0 1 0 150 140" fill="none" stroke="#B69A67" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <Logo tone="light" />
        <div className="relative max-w-md">
          <p className="eyebrow text-champagne">Plataforma Oralclin</p>
          <h1 className="mt-4 font-serif text-[44px] leading-[1.08] tracking-[-0.01em]">
            Cada sorriso, <em className="text-champagne">acompanhado</em> do primeiro contato ao último retorno.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-white/60">
            Agenda, prontuário, planos de tratamento, financeiro e relacionamento — integrados em um só lugar.
          </p>
        </div>
        <div className="relative flex items-center gap-6 text-[12px] text-white/45">
          <span>Agenda inteligente</span>
          <span className="size-1 rounded-full bg-gold" />
          <span>Prontuário digital</span>
          <span className="size-1 rounded-full bg-gold" />
          <span>Gestão financeira</span>
        </div>
      </aside>

      <main className="flex items-center justify-center bg-ivory px-5 py-12 sm:px-8">
        <div className="w-full max-w-[400px] animate-rise">
          <div className="mb-10 lg:hidden">
            <Logo />
          </div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">Acessar o painel</h2>
          <p className="mt-1.5 text-sm text-muted">Entre com suas credenciais para continuar.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
            <Field label="E-mail" htmlFor="email" error={errors.email?.message}>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="voce@oralclin.com"
                leading={<Mail />}
                aria-invalid={!!errors.email}
                className="h-11"
                {...register("email")}
              />
            </Field>
            <Field label="Senha" htmlFor="password" error={errors.password?.message}>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                leading={<Lock />}
                aria-invalid={!!errors.password}
                className="h-11"
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="rounded-md p-1 text-subtle hover:text-ink"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                }
                {...register("password")}
              />
            </Field>
            {error ? (
              <p role="alert" className="rounded-[10px] bg-danger-soft px-3 py-2.5 text-[13px] text-danger">
                {error}
              </p>
            ) : null}
            <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
              Entrar <ArrowRight />
            </Button>
          </form>

          <div className="mt-8 rounded-[14px] border border-line bg-white p-4">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-gold-dark" />
              <div>
                <p className="text-[13px] font-semibold">Modo demonstração</p>
                <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted">
                  Sem backend: a sessão e os dados ficam neste navegador. Não utilize dados reais de pacientes.
                </p>
              </div>
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">Entrar como</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {DEMO_PROFILES.map((p) => (
                <button
                  key={p.role}
                  type="button"
                  onClick={() => {
                    setValue("email", p.email, { shouldValidate: true });
                    setValue("password", p.password, { shouldValidate: true });
                  }}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[12px] font-medium transition-colors",
                    p.role === "admin" ? "border-ink bg-ink text-white hover:bg-ink-2" : "border-line text-ink-2 hover:border-gold hover:text-gold-dark",
                  )}
                >
                  {USER_ROLE_LABELS[p.role]}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[12px] text-subtle">
              Administrador: <span className="font-medium text-ink-2">admin@oralclin.com</span> · <span className="font-medium text-ink-2">admin123</span>
            </p>
          </div>

          <p className="mt-8 text-center text-[12.5px] text-subtle">
            <Link href="/" className="hover:text-ink">← Voltar ao site</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
