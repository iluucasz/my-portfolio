import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/index.scss";
import { Header } from "@/components/header";
import BackToTop from "@/components/back-to-top";
import SectionTimeline from "@/components/section-timeline";
import BackgroundEffects from "@/components/background-effects";
import { Suspense } from "react";
import LoadingPage from "./loading";
import Toaster from "@/components/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LSS Portfolio",
  description: "Meu website para demonstração de currículo e techs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="overflow-x-hidden">
      <body className={`${inter.className} relative overflow-x-hidden`}>
        <BackgroundEffects />
        <BackToTop />
        <SectionTimeline />
        <Toaster />
        <Header />
        <main className="relative z-10 pt-20 overflow-x-hidden">
          <Suspense fallback={<LoadingPage />}>
            {children}
          </Suspense>
        </main>
      </body>
    </html>
  );
}
