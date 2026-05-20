export interface ModulePlus {
  id: number;
  title: string;
  description: string;
  level: string;
  blocked: boolean;
}

/**
 * Conteúdos avançados oferecidos como Módulos Plus. No MVP esses módulos
 * permanecem bloqueados; futuramente poderão ser liberados mediante um
 * plano de assinatura. O campo blocked indica se o módulo está disponível
 * no plano atual.
 */
export const modulesPlus: ModulePlus[] = [
  {
    id: 10,
    title: 'Compatibilização técnica com IA',
    description: 'Aprenda a coordenar disciplinas usando IA.',
    level: 'Avançado',
    blocked: true,
  },
  {
    id: 11,
    title: 'Orçamentos e quantitativos com IA',
    description: 'Estimativas preliminares de custo e materiais.',
    level: 'Avançado',
    blocked: true,
  },
  {
    id: 12,
    title: 'Planejamento de obra com IA',
    description: 'Ferramentas para planejar cronogramas preliminares.',
    level: 'Avançado',
    blocked: true,
  },
  {
    id: 13,
    title: 'Vistorias e relatórios técnicos com IA',
    description: 'Estruture relatórios de vistoria e análises preliminares.',
    level: 'Avançado',
    blocked: true,
  },
  {
    id: 14,
    title: 'Segurança do trabalho em obras com IA',
    description: 'Estudo conceitual sobre segurança em canteiros.',
    level: 'Avançado',
    blocked: true,
  },
  {
    id: 15,
    title: 'Estruturas com IA',
    description: 'Aprofunde seu conhecimento em estruturas com apoio de IA.',
    level: 'Avançado',
    blocked: true,
  },
];