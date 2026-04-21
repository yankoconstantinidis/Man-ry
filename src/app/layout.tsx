import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["300","400","500","600","700","800","900"] });

export const metadata: Metadata = {
  title: "Manáry Digital Growth — Agência de Performance Digital",
  description: "Transformamos digital em resultado. Mídia Paga, SEO, Dev, Automações, CRM e Analytics integrados em uma única estratégia orientada a resultados.",
  keywords: "agência digital, growth hacking, mídia paga, Google Ads, Meta Ads, SEO, CRM, automação, marketing digital",
  openGraph: {
    title: "Manáry Digital Growth",
    description: "Transformamos digital em resultado.",
    url: "https://manary.co",
    siteName: "Manáry Digital",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
