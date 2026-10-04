import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oralclin.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Oralclin | Odontologia e Saúde",
    template: "%s | Oralclin",
  },
  description:
    "Odontologia estética, implantes, alinhadores e reabilitação oral com planejamento digital e atendimento humanizado.",
  applicationName: "Oralclin",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Oralclin",
    title: "Oralclin | Odontologia e Saúde",
    description: "Seu sorriso merece um novo capítulo. Agende sua avaliação.",
    images: [{ url: "/images/clinica-fachada.jpg", width: 296, height: 306, alt: "Fachada da Oralclin" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#FAF9F7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="min-h-dvh">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
