import { repositories } from "@/repositories";
import type { CreateInput } from "@/types/common";
import type { SessionUser, User } from "./types";

/**
 * Autenticação DEMONSTRATIVA. Não há segurança real nesta versão:
 * credenciais ficam no navegador. Para produção, substitua por um
 * AuthProvider com backend (sessão httpOnly, hash de senha, 2FA).
 */
export const authService = {
  async login(email: string, password: string): Promise<SessionUser> {
    const user = await repositories.users.findByEmail(email);
    if (!user || user.demoPassword !== password) throw new Error("E-mail ou senha incorretos.");
    if (!user.active) throw new Error("Usuário desativado. Fale com o administrador.");
    await repositories.users.update(user.id, { lastLoginAt: new Date().toISOString() });
    return { id: user.id, name: user.name, email: user.email, role: user.role, professionalId: user.professionalId };
  },
};

export const userService = {
  list: async () => (await repositories.users.list()).sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
  async create(input: CreateInput<User>) {
    if (await repositories.users.findByEmail(input.email)) throw new Error("Já existe um usuário com este e-mail.");
    return repositories.users.create(input);
  },
  update: (id: string, patch: Partial<User>) => repositories.users.update(id, patch),
  remove: (id: string) => repositories.users.remove(id),
};
