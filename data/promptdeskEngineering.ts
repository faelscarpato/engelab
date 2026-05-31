export type PromptDeskTaskId =
  | 'technical-board'
  | 'project-analysis'
  | 'conceptual-memorial'
  | 'compatibility-review'
  | 'quantities-budget'
  | 'construction-planning'
  | 'technical-inspection'
  | 'safety-worksite'
  | 'render-briefing';

export type PromptDeskDisciplineId =
  | 'structural'
  | 'electrical'
  | 'hydrosanitary'
  | 'bim-revit'
  | 'documentation'
  | 'budget'
  | 'planning'
  | 'safety'
  | 'rendering';

export type PromptDeskAgent = {
  id: string;
  name: string;
  category: string;
  description: string;
  bestFor: string[];
  guardrails: string[];
  requiredFields: string[];
};

export type PromptDeskTask = {
  id: PromptDeskTaskId;
  title: string;
  description: string;
  output: string;
  recommendedAgentId: string;
  checklist: string[];
};

export type PromptDeskDiscipline = {
  id: PromptDeskDisciplineId;
  name: string;
  scope: string;
  criticalData: string[];
  warning: string;
};

export const promptDeskSafetyNotice =
  'Uso educacional, preliminar e de organização técnica. Não constitui projeto executivo, cálculo final, laudo, ART/RRT, aprovação legal, autorização de obra ou substituição de profissional habilitado.';

export const engineeringAgents: PromptDeskAgent[] = [
  {
    id: 'engenlab-estrutural-projetos-ia-01',
    name: 'EngenLab Estrutural IA — Projetos 01 a 20',
    category: 'Engenharia / Estrutural',
    description:
      'Organiza projetos-modelo estruturais, prompts, checklists, memoriais conceituais, pranchas A3 e lacunas preliminares.',
    bestFor: [
      'lançamento estrutural preliminar',
      'vigas, pilares, lajes e fundações em nível conceitual',
      'pranchas educacionais A3',
      'checklists e lacunas estruturais',
    ],
    guardrails: [
      'Não dimensionar estrutura de forma definitiva.',
      'Não afirmar segurança estrutural.',
      'Separar fato observado, hipótese e pendência.',
      'Exigir validação por profissional habilitado.',
    ],
    requiredFields: ['tipo de edificação', 'sistema estrutural', 'vãos', 'cargas', 'materiais', 'fundações', 'sondagem', 'escala'],
  },
  {
    id: 'engenlab-eletrico-projetos-ia-02',
    name: 'EngenLab Elétrico IA — Projetos 21 a 35',
    category: 'Engenharia / Instalações Elétricas',
    description:
      'Organiza pontos, circuitos conceituais, quadros, checklists e prompts de instalações elétricas educacionais.',
    bestFor: ['pontos elétricos', 'quadro conceitual de cargas', 'compatibilização elétrica', 'checklist de entrada de dados'],
    guardrails: [
      'Não entregar dimensionamento elétrico final.',
      'Não substituir norma, concessionária ou projetista.',
      'Não definir bitola/disjuntor como solução executiva.',
    ],
    requiredFields: ['tensão', 'padrão de entrada', 'cargas', 'ambientes', 'circuitos', 'concessionária', 'normas aplicáveis'],
  },
  {
    id: 'engenlab-hidrossanitario-projetos-ia-03',
    name: 'EngenLab Hidrossanitário IA — Projetos 36 a 50',
    category: 'Engenharia / Hidrossanitário',
    description:
      'Organiza redes conceituais, pontos de água/esgoto, checklists, memoriais e prompts hidrossanitários.',
    bestFor: ['pontos de água e esgoto', 'ambientes molhados', 'compatibilização', 'memorial conceitual hidrossanitário'],
    guardrails: [
      'Não dimensionar rede hidráulica/sanitária final.',
      'Não declarar aprovação por concessionária.',
      'Tratar diâmetros, declividades e reservatórios como dados a validar.',
    ],
    requiredFields: ['pontos de consumo', 'diâmetros', 'pressão', 'reservatórios', 'caixas', 'declividades', 'ventilação'],
  },
  {
    id: 'engenlab-prompts-modulares-ia-04',
    name: 'EngenLab Prompts Modulares IA',
    category: 'Engenharia / Documentação técnica',
    description:
      'Transforma briefings, PDFs e dados soltos em prompts técnicos modulados, com função, contexto, limites e formato de saída.',
    bestFor: ['gerar prompt mestre', 'adaptar prompt por disciplina', 'documentar entrega', 'criar roteiro de uso para IA'],
    guardrails: [
      'Não mascarar limitações do briefing.',
      'Explicitar dados ausentes.',
      'Não vender prompt como validação técnica.',
    ],
    requiredFields: ['objetivo', 'disciplina', 'tipo de documento', 'formato de saída', 'dados de entrada', 'restrições'],
  },
  {
    id: 'engenlab-compatibilizacao-ia-modulo-10',
    name: 'EngenLab Compatibilização Técnica IA',
    category: 'Engenharia / Compatibilização',
    description:
      'Compara disciplinas, identifica interferências conceituais e organiza matriz de pendências por gravidade.',
    bestFor: ['arquitetura x estrutura', 'instalações x estrutura', 'matriz de interferências', 'ata técnica de compatibilização'],
    guardrails: [
      'Não declarar conformidade definitiva.',
      'Não substituir revisão de projeto.',
      'Classificar riscos como preliminares.',
    ],
    requiredFields: ['disciplinas comparadas', 'arquivos analisados', 'escala', 'ambientes', 'interferências percebidas', 'prioridade'],
  },
  {
    id: 'engenlab-orcamento-quantitativos-ia-05',
    name: 'EngenLab Orçamento e Quantitativos IA',
    category: 'Engenharia / Orçamento',
    description:
      'Organiza quantitativos, lista de materiais, premissas de orçamento e solicitações de cotação em nível preliminar.',
    bestFor: ['levantamento conceitual', 'lista de materiais', 'curva ABC conceitual', 'comparativo de cenários'],
    guardrails: [
      'Não apresentar orçamento final.',
      'Não inventar preços ou índices.',
      'Exigir base de composição e cotação local.',
    ],
    requiredFields: ['escopo', 'unidades', 'quantidades', 'premissas', 'base de preços', 'localidade', 'data-base'],
  },
  {
    id: 'engenlab-planejamento-obra-ia-06',
    name: 'EngenLab Planejamento de Obra IA',
    category: 'Engenharia / Planejamento',
    description:
      'Cria EAP conceitual, cronograma físico preliminar, plano de compras e matriz de riscos de prazo.',
    bestFor: ['EAP', 'cronograma preliminar', 'plano de compras', 'relatório semanal', 'sequenciamento'],
    guardrails: [
      'Não prometer prazo executivo.',
      'Não substituir planejamento técnico completo.',
      'Separar premissas de restrições reais.',
    ],
    requiredFields: ['escopo', 'etapas', 'equipe', 'prazo desejado', 'restrições', 'fornecedores', 'dependências'],
  },
  {
    id: 'engenlab-vistorias-relatorios-ia-07',
    name: 'EngenLab Vistorias e Relatórios Técnicos IA',
    category: 'Engenharia / Vistorias',
    description:
      'Organiza fotos, observações, fatos, hipóteses e recomendações sem transformar a saída em laudo.',
    bestFor: ['relatório preliminar', 'quadro fotográfico', 'matriz de anomalias', 'roteiro de entrevista'],
    guardrails: [
      'Não emitir laudo.',
      'Não declarar causa definitiva sem evidência.',
      'Encaminhar achados críticos para profissional habilitado.',
    ],
    requiredFields: ['local', 'data', 'fotos', 'observações', 'sintomas', 'histórico', 'limites de inspeção'],
  },
  {
    id: 'engenlab-seguranca-obras-ia-08',
    name: 'EngenLab Segurança do Trabalho em Obras IA',
    category: 'Engenharia / Segurança',
    description:
      'Gera checklists, DDS, APT conceitual, mapa de riscos e plano de ação de segurança em obras.',
    bestFor: ['DDS', 'checklist por etapa', 'APT', 'quase acidente', 'comunicado visual de segurança'],
    guardrails: [
      'Não substituir técnico de segurança.',
      'Não declarar obra segura por IA.',
      'Tratar recomendações como apoio preliminar.',
    ],
    requiredFields: ['atividade', 'frente de trabalho', 'riscos', 'EPI/EPC', 'equipe', 'ambiente', 'procedimentos'],
  },
];

export const engineeringDisciplines: PromptDeskDiscipline[] = [
  {
    id: 'structural',
    name: 'Estrutural',
    scope: 'Lançamento estrutural, vigas, pilares, lajes, fundações e detalhamentos em nível educacional/conceitual.',
    criticalData: ['sistema estrutural', 'vãos', 'cargas', 'materiais', 'fundações', 'sondagem', 'escala'],
    warning: 'Não usar como cálculo, dimensionamento ou validação de segurança.',
  },
  {
    id: 'electrical',
    name: 'Elétrica',
    scope: 'Pontos, circuitos, quadros, cargas, compatibilização elétrica e checklist de dados.',
    criticalData: ['tensão', 'cargas', 'ambientes', 'padrão de entrada', 'concessionária', 'normas'],
    warning: 'Não usar como projeto elétrico executivo ou aprovação de concessionária.',
  },
  {
    id: 'hydrosanitary',
    name: 'Hidrossanitário',
    scope: 'Pontos hidráulicos/sanitários, reservatórios, caixas, declividades e compatibilização preliminar.',
    criticalData: ['pontos de consumo', 'diâmetros', 'pressão', 'reservatórios', 'declividades', 'caixas'],
    warning: 'Não usar como dimensionamento hidráulico/sanitário final.',
  },
  {
    id: 'bim-revit',
    name: 'Revit / BIM',
    scope: 'Modelagem, organização de famílias, vistas, folhas, parâmetros, nomenclatura e documentação BIM.',
    criticalData: ['versão do software', 'nível de desenvolvimento', 'disciplinas', 'padrão de nomes', 'vistas', 'folhas'],
    warning: 'Não assumir compatibilidade sem validar arquivo nativo.',
  },
  {
    id: 'documentation',
    name: 'Documentação técnica',
    scope: 'Memoriais, relatórios conceituais, checklists, prompts mestres e organização de entrega.',
    criticalData: ['tipo de documento', 'objetivo', 'público', 'dados de entrada', 'formato final'],
    warning: 'Não transformar texto educacional em parecer técnico definitivo.',
  },
  {
    id: 'budget',
    name: 'Orçamento / Quantitativos',
    scope: 'Quantitativos preliminares, lista de materiais, escopo dentro/fora, cotações e cenários.',
    criticalData: ['escopo', 'quantidades', 'unidades', 'base de preço', 'data-base', 'localidade'],
    warning: 'Não inventar preços nem fechar orçamento sem base validada.',
  },
  {
    id: 'planning',
    name: 'Planejamento de obra',
    scope: 'EAP, cronograma físico preliminar, compras, dependências e riscos de prazo.',
    criticalData: ['etapas', 'equipes', 'fornecedores', 'restrições', 'dependências', 'prazo'],
    warning: 'Não prometer prazo executivo sem planejamento completo.',
  },
  {
    id: 'safety',
    name: 'Segurança em obras',
    scope: 'DDS, APT, checklist de segurança, mapa de riscos e comunicado visual.',
    criticalData: ['atividade', 'riscos', 'EPI/EPC', 'local', 'equipe', 'procedimentos'],
    warning: 'Não substituir profissional de segurança do trabalho.',
  },
  {
    id: 'rendering',
    name: 'Renderização / Prancha visual',
    scope: 'Briefing para render, prancha A3, composição técnica visual, cenas, ângulos e prompts de imagem.',
    criticalData: ['tipo de cena', 'planta/referência', 'estilo', 'ângulo', 'formato', 'elementos obrigatórios'],
    warning: 'Não alterar dados técnicos nem representar solução executiva não validada.',
  },
];

export const engineeringTasks: PromptDeskTask[] = [
  {
    id: 'technical-board',
    title: 'Criar prancha técnica visual',
    description: 'Gerar prompt e checklist para prancha A3/A4, CAD/BIM, render ou composição técnica educacional.',
    output: 'Prompt visual + checklist de prancha',
    recommendedAgentId: 'engenlab-prompts-modulares-ia-04',
    checklist: ['formato', 'disciplina', 'escala', 'título', 'zonas da prancha', 'aviso técnico', 'dados obrigatórios'],
  },
  {
    id: 'project-analysis',
    title: 'Analisar projeto ou PDF',
    description: 'Organizar fatos extraídos, hipóteses, lacunas, riscos e próximos passos para revisão humana.',
    output: 'Relatório preliminar de análise',
    recommendedAgentId: 'engenlab-compatibilizacao-ia-modulo-10',
    checklist: ['dados identificados', 'dados ausentes', 'disciplinas', 'inconsistências', 'próximos passos'],
  },
  {
    id: 'conceptual-memorial',
    title: 'Criar memorial conceitual',
    description: 'Transformar briefing em memorial descritivo educacional com premissas, limites e pendências.',
    output: 'Memorial conceitual',
    recommendedAgentId: 'engenlab-estrutural-projetos-ia-01',
    checklist: ['objetivo', 'premissas', 'materiais', 'sistema', 'limites', 'responsabilidades'],
  },
  {
    id: 'compatibility-review',
    title: 'Compatibilizar disciplinas',
    description: 'Criar matriz de interferências entre arquitetura, estrutura, elétrica, hidráulica e documentação.',
    output: 'Matriz de compatibilização',
    recommendedAgentId: 'engenlab-compatibilizacao-ia-modulo-10',
    checklist: ['disciplinas', 'ambientes', 'conflitos', 'gravidade', 'responsável', 'ação sugerida'],
  },
  {
    id: 'quantities-budget',
    title: 'Orçamento e quantitativos',
    description: 'Organizar quantitativos, lista de materiais, premissas e solicitação de cotação preliminar.',
    output: 'Quadro preliminar de orçamento',
    recommendedAgentId: 'engenlab-orcamento-quantitativos-ia-05',
    checklist: ['escopo', 'unidade', 'quantidade', 'base de preço', 'data-base', 'premissas'],
  },
  {
    id: 'construction-planning',
    title: 'Planejamento de obra',
    description: 'Gerar EAP conceitual, sequência de atividades, cronograma preliminar e riscos de prazo.',
    output: 'Plano preliminar de obra',
    recommendedAgentId: 'engenlab-planejamento-obra-ia-06',
    checklist: ['etapas', 'dependências', 'equipe', 'fornecedores', 'prazo', 'restrições'],
  },
  {
    id: 'technical-inspection',
    title: 'Vistoria / relatório preliminar',
    description: 'Organizar fotos, achados, sintomas, hipóteses e encaminhamentos sem emitir laudo.',
    output: 'Relatório preliminar educacional',
    recommendedAgentId: 'engenlab-vistorias-relatorios-ia-07',
    checklist: ['local', 'data', 'fotos', 'observações', 'fatos', 'hipóteses', 'encaminhamento'],
  },
  {
    id: 'safety-worksite',
    title: 'Segurança do trabalho em obra',
    description: 'Criar checklist, DDS, APT conceitual ou plano de ação de segurança.',
    output: 'Checklist / DDS / APT conceitual',
    recommendedAgentId: 'engenlab-seguranca-obras-ia-08',
    checklist: ['atividade', 'frente', 'riscos', 'EPI', 'EPC', 'equipe', 'procedimento'],
  },
  {
    id: 'render-briefing',
    title: 'Gerar briefing de render técnico',
    description: 'Converter informações de projeto em prompt de render ou prancha visual fiel às referências.',
    output: 'Prompt de imagem/render',
    recommendedAgentId: 'engenlab-prompts-modulares-ia-04',
    checklist: ['ângulo', 'estilo', 'formato', 'materiais', 'elementos obrigatórios', 'negative prompt'],
  },
];

export function getTask(id: PromptDeskTaskId) {
  return engineeringTasks.find((task) => task.id === id) ?? engineeringTasks[0];
}

export function getDiscipline(id: PromptDeskDisciplineId) {
  return engineeringDisciplines.find((discipline) => discipline.id === id) ?? engineeringDisciplines[0];
}

export function getAgent(id: string) {
  return engineeringAgents.find((agent) => agent.id === id) ?? engineeringAgents[0];
}

export function routeEngineeringAgent(taskId: PromptDeskTaskId, disciplineId: PromptDeskDisciplineId) {
  if (disciplineId === 'structural') return getAgent('engenlab-estrutural-projetos-ia-01');
  if (disciplineId === 'electrical') return getAgent('engenlab-eletrico-projetos-ia-02');
  if (disciplineId === 'hydrosanitary') return getAgent('engenlab-hidrossanitario-projetos-ia-03');
  if (disciplineId === 'budget') return getAgent('engenlab-orcamento-quantitativos-ia-05');
  if (disciplineId === 'planning') return getAgent('engenlab-planejamento-obra-ia-06');
  if (disciplineId === 'safety') return getAgent('engenlab-seguranca-obras-ia-08');
  if (taskId === 'technical-inspection') return getAgent('engenlab-vistorias-relatorios-ia-07');
  return getAgent(getTask(taskId).recommendedAgentId);
}
