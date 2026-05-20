# ENGELAB Design System v1.1 — Implementação

Este projeto recebeu a implementação do design system extraído da interface mobile ENGELAB, com foco em clareza, legibilidade, navegação orientada à tarefa e redução de densidade visual.

## Arquivos principais

- `app/globals.css`: tokens visuais, classes base e componentes CSS reutilizáveis.
- `components/ClientShell.tsx`: shell condicional para a área `/app`.
- `components/Sidebar.tsx`: navegação desktop com estado ativo.
- `components/Header.tsx`: topbar responsiva.
- `components/BottomCreateSheet.tsx`: navegação mobile com ação central "Criar".
- `lib/design.ts`: helpers para ícones, badges por disciplina e labels.

## Melhorias implementadas

- Tema escuro premium com tokens de cor ENGELAB.
- Cards mais escaneáveis com título, descrição, metadados e ações explícitas.
- CTA central mobile com label "Criar" e bottom sheet de ações.
- Busca e filtros em Projetos Modelo.
- Banner e CTAs textuais em Prompts Modulares.
- Home orientada à tarefa.
- Estados vazios, badges, chips, botões, inputs e cards padronizados.
- Textos secundários mais legíveis e aviso de responsabilidade mais visível.
- Correção do shell da aplicação para evitar `usePathname` diretamente no RootLayout.
