import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "@/styles/index.scss";
import { Header } from '@/components/header';
import BackToTop from '@/components/back-to-top';
import { Suspense } from 'react';
import LoandingPage from './loanding';
import Toaster from '@/components/toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LSS Portfolio',
  description: 'Meu website para demonstração de currículo e techs',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <BackToTop />
        <Toaster/>
        <Header />
        <Suspense fallback={<LoandingPage/>}>
        {children}
        </Suspense>
      </body>
    </html>
  )
}
