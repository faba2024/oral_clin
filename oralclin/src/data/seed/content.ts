import type { SiteContent } from "@/features/content/types";

export function seedSiteContent(): SiteContent {
  return {
    logo: null,
    brandName: "Oralclin",
    brandTagline: "Odontologia e Saúde",
    heroEyebrow: "Odontologia estética e reabilitação",
    heroTitle: "Seu sorriso merece um novo capítulo.",
    heroSubtitle:
      "Uma mega estrutura com especialistas, tecnologia digital e um cuidado que começa na escuta. Planejamos cada detalhe com você.",
    heroImage: "/images/clinica-fachada.jpg",
    heroHighlights: ["Planejamento digital do sorriso", "Especialistas em cada área", "Atendimento humanizado"],
    clinicTitle: "Uma estrutura pensada para o seu conforto.",
    clinicText:
      "A Oralclin reúne odontologia e saúde em um só lugar. Consultórios equipados, ambiente acolhedor e uma equipe que acompanha cada etapa do tratamento — da primeira avaliação ao último retorno.",
    clinicImage: "/images/clinica-fachada.jpg",
    clinicStats: [
      { id: "st1", value: "+15", label: "especialidades integradas" },
      { id: "st2", value: "3", label: "consultórios equipados" },
      { id: "st3", value: "100%", label: "planejamento personalizado" },
    ],
    ctaTitle: "Comece pela avaliação.",
    ctaText: "Em uma conversa sem pressa, entendemos o que você deseja e mostramos os caminhos possíveis.",
    testimonials: [
      {
        id: "tst_1",
        name: "Mariana C.",
        treatment: "Facetas",
        text: "Fui ouvida desde a primeira consulta. Vi a simulação antes de começar e o resultado ficou exatamente como eu queria: natural.",
        rating: 5,
        published: true,
      },
      {
        id: "tst_2",
        name: "João H.",
        treatment: "Implante",
        text: "Tinha receio da cirurgia, mas o Dr. Lucas explicou cada etapa. Tudo muito tranquilo e organizado.",
        rating: 5,
        published: true,
      },
      {
        id: "tst_3",
        name: "Fernanda O.",
        treatment: "Alinhadores",
        text: "A equipe acompanha de perto e a recepção é impecável. Estou no meio do tratamento e já percebo a diferença.",
        rating: 5,
        published: true,
      },
    ],
    phone: "77981636419",
    whatsapp: "77981636419",
    email: "contato@oralclin.com",
    instagram: "oralclinrp",
    address: "Av. Brasil, 1450 — Centro",
    city: "Bahia",
    mapsUrl: "https://maps.google.com/?q=Oralclin+Odontologia+e+Saude",
    hours: [
      { id: "h1", label: "Segunda a sexta", hours: "08h às 19h" },
      { id: "h2", label: "Sábado", hours: "08h às 12h" },
    ],
    seoTitle: "Oralclin | Odontologia e Saúde",
    seoDescription:
      "Odontologia estética, implantes, alinhadores e reabilitação oral com planejamento digital e atendimento humanizado. Agende sua avaliação.",
  };
}
