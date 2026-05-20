import './globals.css';
import { ReactNode } from 'react';
import ClientShell from '../components/ClientShell';

export const metadata = {
  title: 'ENGELAB — Engenharia com IA',
  description: 'Biblioteca técnica de projetos, prompts e checklists para engenharia com IA.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
