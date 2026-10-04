import type { ModuleKey, UserRole } from "./types";

/** Matriz de permissões simulada. Em produção, validar também no backend. */
export const ROLE_PERMISSIONS: Record<UserRole, ModuleKey[]> = {
  admin: [
    "dashboard", "agenda", "pacientes", "crm", "tratamentos", "orcamentos", "financeiro", "profissionais",
    "prontuarios", "antes-depois", "relatorios", "conteudo", "whatsapp", "configuracoes",
  ],
  recepcao: ["dashboard", "agenda", "pacientes", "whatsapp", "orcamentos"],
  dentista: ["dashboard", "agenda", "pacientes", "prontuarios", "orcamentos", "antes-depois"],
  financeiro: ["dashboard", "financeiro", "orcamentos", "relatorios", "pacientes"],
  comercial: ["dashboard", "crm", "whatsapp", "orcamentos", "relatorios"],
};

export function canAccess(role: UserRole | undefined, moduleKey: ModuleKey): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role].includes(moduleKey);
}

export const MODULE_LABELS: Record<ModuleKey, string> = {
  dashboard: "Visão geral",
  agenda: "Agenda",
  pacientes: "Pacientes",
  crm: "CRM",
  tratamentos: "Tratamentos",
  orcamentos: "Orçamentos",
  financeiro: "Financeiro",
  profissionais: "Profissionais",
  prontuarios: "Prontuários",
  "antes-depois": "Antes e Depois",
  relatorios: "Relatórios",
  conteudo: "Conteúdo",
  whatsapp: "WhatsApp",
  configuracoes: "Configurações",
};

export function moduleFromPath(pathname: string): ModuleKey {
  const segment = pathname.replace(/^\/admin\/?/, "").split("/")[0];
  if (!segment) return "dashboard";
  return (segment in MODULE_LABELS ? segment : "dashboard") as ModuleKey;
}
