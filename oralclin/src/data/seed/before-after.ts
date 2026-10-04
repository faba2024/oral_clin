import type { BeforeAfterCase } from "@/features/before-after/types";
import { dayOffset, stamp } from "./helpers";

export function seedBeforeAfter(): BeforeAfterCase[] {
  return [
    {
      id: "ba_facetas",
      title: "Facetas — harmonia de cor e forma",
      patientId: null,
      patientLabel: "Paciente, 34 anos",
      treatmentId: "trt_facetas",
      professionalId: "prof_camila",
      beforeImage: "/images/caso-facetas-antes.jpg",
      afterImage: "/images/caso-facetas-depois.jpg",
      date: dayOffset(-40),
      description: "Correção de cor, proporção e contorno dos dentes anteriores com planejamento digital.",
      published: true,
      consentConfirmed: true,
      ...stamp(-40),
    },
    {
      id: "ba_reabilitacao",
      title: "Reabilitação estética completa",
      patientId: null,
      patientLabel: "Paciente, 46 anos",
      treatmentId: "trt_lentes",
      professionalId: "prof_camila",
      beforeImage: "/images/caso-reabilitacao-antes.jpg",
      afterImage: "/images/caso-reabilitacao-depois.jpg",
      date: dayOffset(-75),
      description: "Fechamento de diastema e reanatomização das arcadas superior e inferior.",
      published: true,
      consentConfirmed: true,
      ...stamp(-75),
    },
  ];
}
