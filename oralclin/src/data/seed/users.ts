import type { User } from "@/features/users/types";
import { stamp } from "./helpers";

export function seedUsers(): User[] {
  return [
    { id: "usr_admin", name: "Gestão Oralclin", email: "admin@oralclin.com", demoPassword: "admin123", role: "admin", active: true, professionalId: null, lastLoginAt: null, ...stamp(-400) },
    { id: "usr_recepcao", name: "Ana Paula Reis", email: "recepcao@oralclin.com", demoPassword: "demo123", role: "recepcao", active: true, professionalId: null, lastLoginAt: null, ...stamp(-380) },
    { id: "usr_camila", name: "Dra. Camila Andrade", email: "camila.andrade@oralclin.com", demoPassword: "demo123", role: "dentista", active: true, professionalId: "prof_camila", lastLoginAt: null, ...stamp(-380) },
    { id: "usr_lucas", name: "Dr. Lucas Ferreira", email: "lucas.ferreira@oralclin.com", demoPassword: "demo123", role: "dentista", active: true, professionalId: "prof_lucas", lastLoginAt: null, ...stamp(-380) },
    { id: "usr_financeiro", name: "Marcelo Duarte", email: "financeiro@oralclin.com", demoPassword: "demo123", role: "financeiro", active: true, professionalId: null, lastLoginAt: null, ...stamp(-300) },
    { id: "usr_comercial", name: "Renata Sales", email: "comercial@oralclin.com", demoPassword: "demo123", role: "comercial", active: true, professionalId: null, lastLoginAt: null, ...stamp(-200) },
  ];
}
