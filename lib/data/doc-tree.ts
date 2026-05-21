import { engelabProjects } from './engelab-projects';
import type { FileType } from '../types/library';

export interface DocNode {
  id: string;
  label: string;
  type: 'folder' | 'file';
  fileType?: FileType;
  url?: string;
  children?: DocNode[];
  nextDoc?: string;
}

const RAW_BASE = 'https://raw.githubusercontent.com/faelscarpato/engelab_doc/main';

function rawUrl(path: string) {
  return `${RAW_BASE}/${path.split('/').map(encodeURIComponent).join('/')}`;
}

function fileNode(id: string, label: string, path: string, fileType: FileType): DocNode {
  return {
    id,
    label,
    type: 'file',
    fileType,
    url: rawUrl(path),
  };
}

const firstSteps: DocNode = {
  id: 'primeiros-passos',
  label: 'Primeiros Passos',
  type: 'folder',
  children: [
    fileNode(
      'aula-1-apostila',
      'Aula 1 - Apostila Dominando a Biblioteca',
      '00_0_Manual Operacional/Apostila Dominando a Biblioteca de 50 projetos-modelo.pdf',
      'pdf'
    ),
    fileNode('aula-2-como-usar', 'Aula 2 - Como usar a Biblioteca', '00_GUIA_DE_USO/01_Como_Usar_A_Biblioteca.pdf', 'pdf'),
    fileNode('aula-3-indice', 'Aula 3 - Índice da Biblioteca', '00_GUIA_DE_USO/03_Indice_Da_Biblioteca.pdf', 'pdf'),
    fileNode('aula-4-catalogo-prompts', 'Aula 4 - Catálogo de Prompts', '04_PROMPTS_MODULARES/Catalogo_De_Prompts_Modulares.pdf', 'pdf'),
    fileNode('aula-5-prompt-base', 'Aula 5 - Prompt Base Geral', '04_PROMPTS_MODULARES/Prompt_Base_Geral.txt', 'txt'),
    fileNode('aula-6-checklist', 'Aula 6 - Checklist de Estudo Geral', '00_GUIA_DE_USO/04_Checklist_De_Estudo_Geral.pdf', 'pdf'),
    fileNode(
      'aula-7-manual-oficial',
      'Aula 7 - Manual Oficial Biblioteca 50',
      '00_0_Manual Operacional/Manual_Oficial_Biblioteca_50_Projetos_Modelo_V02_Limpo.pdf',
      'pdf'
    ),
  ],
};

const promptDocs: DocNode = {
  id: 'prompts-modulares',
  label: 'Prompts Modulares',
  type: 'folder',
  children: [
    fileNode('prompt-catalogo', 'Catálogo de Prompts Modulares', '04_PROMPTS_MODULARES/Catalogo_De_Prompts_Modulares.pdf', 'pdf'),
    fileNode('prompt-base-geral', 'Prompt Base Geral', '04_PROMPTS_MODULARES/Prompt_Base_Geral.txt', 'txt'),
    fileNode('prompts-estruturais', 'Prompts Estruturais', '04_PROMPTS_MODULARES/Prompts_Estruturais.txt', 'txt'),
    fileNode('prompts-eletricos', 'Prompts Elétricos', '04_PROMPTS_MODULARES/Prompts_Eletricos.txt', 'txt'),
    fileNode('prompts-hidrossanitarios', 'Prompts Hidrossanitários', '04_PROMPTS_MODULARES/Prompts_Hidrossanitarios.txt', 'txt'),
    fileNode('prompts-estrutural-claude', 'Prompts Estrutural Claude 01-20', '04_PROMPTS_MODULARES/Prompts_Estrutural_Claude_01-20.md', 'md'),
    fileNode('prompts-eletrica-claude', 'Prompts Elétrica Claude 21-35', '04_PROMPTS_MODULARES/Prompts_Eletrica_Claude_21-35.md', 'md'),
    fileNode('prompts-hidro-claude', 'Prompts Hidrossanitário Claude 36-50', '04_PROMPTS_MODULARES/Prompts_Hidrossanitário_Claude_36-50.md', 'md'),
    fileNode('prompts-projeto-estrutural', 'Prompts Projeto Estrutural Claude 01-06', '04_PROMPTS_MODULARES/Prompts_Projeto_Estrutural_Claude_01-06.md', 'md'),
  ],
};

const projectDocs: DocNode = {
  id: 'biblioteca-projetos',
  label: 'Biblioteca 50 Projetos-Modelo',
  type: 'folder',
  children: ['Estrutural', 'Elétrico', 'Hidrossanitário'].map((discipline) => ({
    id: `disciplina-${discipline.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`,
    label: discipline,
    type: 'folder' as const,
    children: engelabProjects
      .filter((project) => project.discipline === discipline)
      .map((project) => ({
        id: `projeto-${project.id}`,
        label: `${project.code} - ${project.title}`,
        type: 'folder' as const,
        children: project.files.map((file, index) => ({
          id: `${project.id}-${index}-${file.type}`,
          label: file.label,
          type: 'file' as const,
          fileType: file.type,
          url: file.url,
        })),
      })),
  })),
};

function linkNextDocs(nodes: DocNode[]) {
  const files: DocNode[] = [];

  function visit(node: DocNode) {
    if (node.type === 'file') files.push(node);
    node.children?.forEach(visit);
  }

  nodes.forEach(visit);
  files.forEach((file, index) => {
    file.nextDoc = files[index + 1]?.id;
  });

  return nodes;
}

export const docTree: DocNode[] = linkNextDocs([firstSteps, promptDocs, projectDocs]);
