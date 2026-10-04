import type { Professional } from "@/features/professionals/types";
import { stamp } from "./helpers";

const weekdays = (start: string, end: string, days = [1, 2, 3, 4, 5]) =>
  days.map((weekday) => ({ weekday, start, end }));

export function seedProfessionals(): Professional[] {
  return [
    {
      id: "prof_camila",
      title: "Dra.",
      name: "Camila Andrade",
      cro: "CRO-BA 18.432",
      specialty: "Dentística e Estética do Sorriso",
      phone: "77981110021",
      email: "camila.andrade@oralclin.com",
      bio: "Especialista em dentística restauradora e reabilitação estética. Conduz os planejamentos de facetas e lentes da Oralclin com protocolo digital do sorriso.",
      color: "#B69A67",
      workingHours: weekdays("08:00", "18:00"),
      treatmentIds: ["trt_facetas", "trt_lentes", "trt_clareamento", "trt_restauracao", "trt_avaliacao"],
      status: "ativo",
      commissionRate: 0.35,
      showOnSite: true,
      ...stamp(-420),
    },
    {
      id: "prof_lucas",
      title: "Dr.",
      name: "Lucas Ferreira",
      cro: "CRO-BA 15.907",
      specialty: "Implantodontia e Prótese",
      phone: "77981110034",
      email: "lucas.ferreira@oralclin.com",
      bio: "Implantodontista com foco em reabilitações completas e cirurgias guiadas. Atua com planejamento tomográfico para mais previsibilidade.",
      color: "#4F6A80",
      workingHours: weekdays("08:00", "17:00", [1, 2, 3, 4, 5, 6]),
      treatmentIds: ["trt_implante", "trt_protese", "trt_endodontia", "trt_periodontia", "trt_avaliacao"],
      status: "ativo",
      commissionRate: 0.4,
      showOnSite: true,
      ...stamp(-420),
    },
    {
      id: "prof_beatriz",
      title: "Dra.",
      name: "Beatriz Lemos",
      cro: "CRO-BA 21.118",
      specialty: "Ortodontia e Alinhadores",
      phone: "77981110047",
      email: "beatriz.lemos@oralclin.com",
      bio: "Ortodontista certificada em alinhadores transparentes. Acompanha cada fase do tratamento com escaneamento intraoral.",
      color: "#6E8B74",
      workingHours: weekdays("09:00", "18:00", [1, 3, 4, 5]),
      treatmentIds: ["trt_alinhadores", "trt_ortodontia", "trt_limpeza", "trt_harmonizacao", "trt_avaliacao"],
      status: "ativo",
      commissionRate: 0.35,
      showOnSite: true,
      ...stamp(-300),
    },
  ];
}
