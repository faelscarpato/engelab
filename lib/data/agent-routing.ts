export interface AgentRoute {
  label: string;
  category: string;
  url: string;
  status: 'active' | 'planned';
}

const CHATGPT_HOME = 'https://chatgpt.com/';

export const agentRouting: Record<string, AgentRoute> = {
  Estrutural: {
    label: 'EngenLab IA',
    category: 'Engenharia & Arquitetura',
    url: CHATGPT_HOME,
    status: 'active',
  },
  Elétrico: {
    label: 'EngenLab IA',
    category: 'Engenharia & Arquitetura',
    url: CHATGPT_HOME,
    status: 'active',
  },
  Hidrossanitário: {
    label: 'Biblioteca 50 Projetos GPT',
    category: 'Engenharia & Arquitetura',
    url: CHATGPT_HOME,
    status: 'active',
  },
  'CAD/BIM': {
    label: 'GPT CAD / BIM Técnico',
    category: 'CAD, BIM e Documentação Técnica',
    url: CHATGPT_HOME,
    status: 'active',
  },
  'Cálculo IA': {
    label: 'Módulo Estruturas IA',
    category: 'Engenharia & Arquitetura',
    url: CHATGPT_HOME,
    status: 'active',
  },
  'Landing Page': {
    label: 'CapyLanding GPT',
    category: 'Landing Pages e Conversão',
    url: CHATGPT_HOME,
    status: 'active',
  },
  'UX/Produto': {
    label: 'CapyUX GPT',
    category: 'UX, Produto e Experiência',
    url: CHATGPT_HOME,
    status: 'active',
  },
  Geral: {
    label: 'Agente Prompt Técnico',
    category: 'Prompts',
    url: CHATGPT_HOME,
    status: 'active',
  },
};

export function resolveAgentRoute(discipline: string, projectType: string) {
  const byProjectType = agentRouting[projectType];
  if (byProjectType) return byProjectType;

  return agentRouting[discipline] ?? agentRouting.Geral;
}
