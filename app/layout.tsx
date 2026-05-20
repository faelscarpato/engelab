import './globals.css';
import { ReactNode } from 'react';
import ClientShell from '../components/ClientShell';

export const metadata = {
  title: 'ENGELAB — Biblioteca de Engenharia Civil com IA',
  description: '50 projetos-modelo, prompts técnicos, checklists e agentes IA para estudo e produção conceitual em engenharia civil.',
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