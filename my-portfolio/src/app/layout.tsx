import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "@/styles/index.scss";
import { Header } from '@/components/header';
import BackToTop from '@/components/back-to-top';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LSS Portfolio',
  description: 'Meu website para demonstração de currículo e techs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <BackToTop />
        <Header />
        {children}
      </body>
    </html>
  )
}
