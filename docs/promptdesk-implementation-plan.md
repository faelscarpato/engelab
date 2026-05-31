# Plano de implementação — Engelab PromptDesk

## Objetivo

Transformar o repositório `faelscarpato/engelab` em uma base do **Engelab PromptDesk**, começando pelo nicho de **Engenharia** e mantendo arquitetura escalável para novos nichos, como Educação, RH, Marketing Local, Jurídico, Saúde e Operações.

## Decisão inicial

O pacote anexado contém a versão instalável do PromptDesk em Electron + React + TypeScript + Vite + Tailwind. O repositório atual está em Next.js e já possui deploy web em Cloudflare Pages. A primeira implementação foi iniciada como uma rota web isolada em `/promptdesk`, para validar o produto sem quebrar imediatamente toda a aplicação existente.

## Fase 1 — Engenharia operacional

Implementado:

- rota `/promptdesk`;
- seleção de tarefa;
- seleção de disciplina;
- formulário guiado de briefing;
- cálculo de prontidão: verde, amarelo ou vermelho;
- roteamento automático de agente;
- seleção manual de agente;
- geração de prompt estruturado;
- botão de cópia do prompt;
- aviso técnico obrigatório;
- base inicial de agentes de engenharia.

Agentes base:

1. EngenLab Estrutural IA — Projetos 01 a 20
2. EngenLab Elétrico IA — Projetos 21 a 35
3. EngenLab Hidrossanitário IA — Projetos 36 a 50
4. EngenLab Prompts Modulares IA
5. EngenLab Compatibilização Técnica IA
6. EngenLab Orçamento e Quantitativos IA
7. EngenLab Planejamento de Obra IA
8. EngenLab Vistorias e Relatórios Técnicos IA
9. EngenLab Segurança do Trabalho em Obras IA

## Fase 2 — Substituição total da experiência

Próximas ações recomendadas:

1. Trocar a landing atual por uma landing do PromptDesk.
2. Transformar `/app` em dashboard PromptDesk.
3. Criar estrutura de nichos: `/promptdesk/engenharia`, `/promptdesk/educacao`, `/promptdesk/rh` etc.
4. Migrar biblioteca de prompts para dados modulares versionados.
5. Adicionar histórico local no navegador.
6. Adicionar exportação `.txt`, `.md` e `.json`.
7. Criar camada de upload/extração de PDF web.
8. Integrar autenticação e persistência via Supabase.
9. Criar roteador de agentes por nicho.
10. Criar tela de marketplace/biblioteca de agentes.

## Fase 3 — Desktop e web unificados

Depois da validação web:

- manter Electron como versão desktop local-first;
- manter Next.js como portal web/comercial;
- compartilhar a mesma base de agentes, tarefas e prompts;
- separar `core/promptdesk` para lógica comum;
- criar pacote reutilizável para roteamento, prontidão, prompt builder e templates.

## Limites técnicos obrigatórios

Todas as saídas de engenharia devem declarar claramente que são:

- educacionais;
- preliminares;
- conceituais;
- para revisão humana;
- sem ART/RRT;
- sem CREA/CAU;
- sem laudo;
- sem cálculo final;
- sem validação de segurança;
- sem autorização para obra.

## Estratégia de escala por nicho

Cada novo nicho deve seguir o mesmo contrato:

```ts
type Niche = {
  id: string;
  name: string;
  tasks: Task[];
  agents: Agent[];
  fields: GuidedField[];
  readinessRules: ReadinessRule[];
  promptBuilder: PromptBuilder;
  safetyRules: string[];
};
```

Assim o PromptDesk deixa de ser apenas uma biblioteca de prompts e vira uma mesa operacional por profissão, nicho ou departamento.
