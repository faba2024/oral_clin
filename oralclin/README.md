# Oralclin — Plataforma de gestão odontológica + site institucional

Sistema completo para a clínica **Oralclin | Odontologia e Saúde**: site institucional premium com agendamento online e painel administrativo com agenda, pacientes, prontuário com odontograma, CRM, planos de tratamento/orçamentos, financeiro, profissionais, relatórios, central de WhatsApp, CMS e configurações.

> **Modo demonstração / local.** Esta versão **não possui backend**. Os dados ficam no navegador (IndexedDB) e a autenticação é apenas demonstrativa. **Não utilize dados reais de pacientes nesta versão.** A arquitetura já está preparada para receber um backend seguro (ver “Migração para backend”).

---

## Como rodar

Requisitos: Node.js 18.18+ (recomendado 20 ou 22).

```bash
npm install
npm run dev          # http://localhost:3000
```

Validação:

```bash
npm run lint
npm run typecheck
npm run build
npm start            # serve o build de produção
```

### Acesso ao painel

`/admin/login`

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Administrador | admin@oralclin.com | admin123 |
| Recepção | recepcao@oralclin.com | demo123 |
| Dentista | camila.andrade@oralclin.com | demo123 |
| Financeiro | financeiro@oralclin.com | demo123 |
| Comercial | comercial@oralclin.com | demo123 |

A tela de login tem atalhos “Entrar como” para cada perfil. Em **Configurações → Restaurar demonstração** os dados fictícios originais são recarregados.

---

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · React Hook Form + Zod · Recharts · Lucide · date-fns · Zustand.

Componentes de interface (diálogo, drawer, popover, dropdown, tabs, tooltip, toast, combobox, date picker, data table, command palette) foram implementados no próprio projeto, sem dependências pesadas, com foco em acessibilidade (foco preso em modais, ESC, navegação por setas, `aria-*`).

Fontes: Manrope (interface) e Playfair Display (títulos institucionais) via `next/font`.

---

## Estrutura

```
src/
  app/
    (site)/            site público: /, /tratamentos, /tratamentos/[slug], /antes-e-depois,
                       /profissionais, /clinica, /contato, /agendar
    admin/login/       login demonstrativo
    admin/(panel)/     painel: /admin, /agenda, /pacientes, /pacientes/[id], /crm, /tratamentos,
                       /orcamentos, /orcamentos/[id], /financeiro, /profissionais, /prontuarios,
                       /antes-depois, /relatorios, /conteudo, /whatsapp, /configuracoes
    sitemap.ts, robots.ts, not-found.tsx
  components/
    ui/                design system (button, input, dialog, drawer, data-table, calendar…)
    admin/             shell do painel (sidebar, topbar, busca Ctrl+K, notificações, atalhos)
    site/              header, footer, seções do site
    shared/            marca, page header, stat card, upload de imagem, ilustrações
    charts/            gráficos (Recharts) com tema da marca
  features/<módulo>/   types · repository · service · hooks · components
    appointments, patients, records, treatments, budgets, crm, finance, professionals,
    before-after, documents, notifications, users, content, settings, reports, whatsapp,
    dashboard, site
  repositories/
    core/              contrato Repository<T>, implementação local genérica, barramento de eventos
    storage/           drivers (IndexedDB → localStorage → memória) e FileStorage
    index.ts           CONTAINER — ponto único de troca de backend
  data/seed/           dados fictícios coerentes (datas relativas ao dia atual)
  hooks/ stores/ types/ utils/
```

### Fluxo de dados

`Componente → hook do módulo (useLiveQuery) → service (regras de negócio) → repository (interface) → driver de armazenamento`

- Nenhum componente acessa `localStorage`/`IndexedDB` diretamente.
- Os hooks se atualizam sozinhos quando uma coleção muda (inclusive em outras abas, via `BroadcastChannel`).
- Regras de negócio ficam nos services: conflito de horários (profissional e sala), horários livres do agendamento online, parcelamento, totais de orçamento, inadimplência, conversão do CRM, produção e comissão por profissional.

---

## Migração para backend

Cada módulo expõe uma interface, por exemplo:

```ts
// src/features/patients/repository.ts
export interface PatientRepository extends Repository<Patient> {
  search(term: string): Promise<Patient[]>;
}
export class LocalPatientRepository extends LocalCollectionRepository<Patient> implements PatientRepository { … }
```

Para usar uma API (Node/Prisma/PostgreSQL, Firebase etc.):

1. Crie `ApiPatientRepository implements PatientRepository` fazendo as chamadas HTTP.
2. Troque a instância em `src/repositories/index.ts`.
3. Telas, hooks e services continuam iguais.

Pontos de integração já isolados:

- **Arquivos** (fotos, radiografias, contratos): `src/repositories/storage/file-storage.ts` → implemente `FileStorage` com S3/R2/GCS (URL assinada).
- **Autenticação**: `src/features/users/service.ts` (`authService`) e `src/stores/auth-store.ts` → substitua por sessão real (cookie httpOnly, hash de senha). As permissões por perfil estão em `src/features/users/permissions.ts` e devem ser validadas também no backend.
- **WhatsApp**: `src/features/whatsapp/service.ts` e `src/utils/whatsapp.ts` → hoje gera links `wa.me`; troque pela Cloud API oficial quando desejado.

---

## Funcionalidades principais

- **Visão geral:** indicadores (consultas, faturamento, a receber, inadimplência, leads, tratamentos ativos), faturamento mensal, origem e conversão de leads, novos pacientes, consultas por dia da semana, pagamentos pendentes, leads recentes, tratamentos em andamento e aniversariantes.
- **Agenda:** visões Hoje (fluxo da recepção: a chegar → recepção → atendimento → finalizadas), Dia (por profissional), Semana e Mês; filtros por dentista, procedimento, status e sala; criar clicando no horário; drawer com ações (confirmar, chegada, iniciar, finalizar, falta, cancelar, remarcar, WhatsApp); bloqueio de conflitos.
- **Pacientes:** tabela com busca instantânea, filtros, ordenação, paginação, exportação CSV e versão em cartões no celular; perfil com Resumo, Consultas, Prontuário, Tratamentos, Financeiro, Documentos, Fotos e Histórico.
- **Prontuário:** anamnese, alertas clínicos, odontograma interativo (FDI, 8 estados, anotações por dente) e evolução clínica. Não há diagnóstico automático nem sugestão de conduta.
- **Orçamentos:** editor de planos com itens do catálogo ou personalizados, descontos, status, documento A4 para impressão, envio pelo WhatsApp e geração de parcelas no financeiro.
- **CRM:** Kanban com arrastar e soltar (e menu “Mover para” no celular), timeline de interações, conversão em paciente, origem mais eficiente.
- **Financeiro:** receitas, despesas, pagamentos, parcelas (baixa, cobrança por WhatsApp), visão por período.
- **Profissionais:** cadastro, horários, procedimentos, agenda individual, produção e comissão.
- **Relatórios:** faturamento, consultas, cancelamentos e faltas, novos pacientes, conversão, tratamentos mais vendidos, origem dos leads, desempenho profissional; exportação CSV e impressão.
- **WhatsApp:** filas de confirmação, lembrete, pós-atendimento e retorno; mensagem rápida com variáveis; editor de modelos.
- **Conteúdo (CMS):** logo, página inicial, clínica, depoimentos, contatos, horários e SEO — refletidos imediatamente no site.
- **Configurações:** clínica, usuários e permissões, agenda e salas, financeiro, notificações, WhatsApp, site e aparência.
- **Site:** home, tratamentos com páginas individuais, galeria antes/depois com comparação interativa, profissionais, clínica, contato (gera lead no CRM) e agendamento online em 6 etapas (gera consulta, paciente e lead; adicionar à agenda Google/.ics; WhatsApp).

Atalhos do painel: `Ctrl + K` busca global · `?` lista de atalhos · `G` + `A/P/C/O/F/R/D` navegação rápida.

---

## Observações sobre o conteúdo

- Endereço, CNPJ, e-mail e profissionais são **fictícios/demonstrativos** e editáveis em *Conteúdo* e *Configurações*. WhatsApp e Instagram usam os canais públicos da clínica.
- As fotos de antes/depois e da fachada vêm das publicações da própria clínica; substitua pelas imagens oficiais em alta resolução (e com autorização dos pacientes) pelo painel.
- Profissionais sem foto exibem um monograma; envie as fotos em *Profissionais*.
