/**
 * Container de repositórios — PONTO ÚNICO DE TROCA DE BACKEND.
 *
 * Hoje todas as implementações são locais (IndexedDB). Para migrar para
 * uma API (Node, Prisma, PostgreSQL, Firebase...), crie por exemplo
 * `ApiPatientRepository implements PatientRepository` e substitua aqui.
 * Services, hooks e telas continuam iguais.
 */
import { LocalAppointmentRepository, type AppointmentRepository } from "@/features/appointments/repository";
import { LocalBeforeAfterRepository, type BeforeAfterRepository } from "@/features/before-after/repository";
import { LocalTreatmentPlanRepository, type TreatmentPlanRepository } from "@/features/budgets/repository";
import { LocalSiteContentRepository, type SiteContentRepository } from "@/features/content/repository";
import { LocalLeadRepository, type LeadRepository } from "@/features/crm/repository";
import { LocalDocumentRepository, type DocumentRepository } from "@/features/documents/repository";
import {
  LocalExpenseRepository,
  LocalReceivableRepository,
  type ExpenseRepository,
  type ReceivableRepository,
} from "@/features/finance/repository";
import { LocalNotificationRepository, type NotificationRepository } from "@/features/notifications/repository";
import { LocalPatientRepository, type PatientRepository } from "@/features/patients/repository";
import { LocalProfessionalRepository, type ProfessionalRepository } from "@/features/professionals/repository";
import { LocalClinicalRecordRepository, type ClinicalRecordRepository } from "@/features/records/repository";
import { LocalSettingsRepository, type SettingsRepository } from "@/features/settings/repository";
import { LocalTreatmentRepository, type TreatmentRepository } from "@/features/treatments/repository";
import { LocalUserRepository, type UserRepository } from "@/features/users/repository";

export interface Repositories {
  patients: PatientRepository;
  professionals: ProfessionalRepository;
  treatments: TreatmentRepository;
  appointments: AppointmentRepository;
  leads: LeadRepository;
  records: ClinicalRecordRepository;
  plans: TreatmentPlanRepository;
  receivables: ReceivableRepository;
  expenses: ExpenseRepository;
  beforeAfter: BeforeAfterRepository;
  documents: DocumentRepository;
  notifications: NotificationRepository;
  users: UserRepository;
  siteContent: SiteContentRepository;
  settings: SettingsRepository;
}

export const repositories: Repositories = {
  patients: new LocalPatientRepository(),
  professionals: new LocalProfessionalRepository(),
  treatments: new LocalTreatmentRepository(),
  appointments: new LocalAppointmentRepository(),
  leads: new LocalLeadRepository(),
  records: new LocalClinicalRecordRepository(),
  plans: new LocalTreatmentPlanRepository(),
  receivables: new LocalReceivableRepository(),
  expenses: new LocalExpenseRepository(),
  beforeAfter: new LocalBeforeAfterRepository(),
  documents: new LocalDocumentRepository(),
  notifications: new LocalNotificationRepository(),
  users: new LocalUserRepository(),
  siteContent: new LocalSiteContentRepository(),
  settings: new LocalSettingsRepository(),
};
