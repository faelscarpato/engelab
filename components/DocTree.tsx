'use client';

import { useEffect, useMemo, useState } from 'react';
import DocModal from './DocModal';
import type { DocNode } from '../lib/data/doc-tree';

interface DocTreeProps {
  nodes: DocNode[];
}

type FilterType = 'all' | 'pdf' | 'txt' | 'md' | 'image';
type FilterStatus = 'all' | 'read' | 'pending';

function flattenFiles(nodes: DocNode[]) {
  const files: DocNode[] = [];

  function visit(node: DocNode) {
    if (node.type === 'file') files.push(node);
    node.children?.forEach(visit);
  }

  nodes.forEach(visit);
  return files;
}

function countFiles(node: DocNode): number {
  if (node.type === 'file') return 1;
  return node.children?.reduce((sum, child) => sum + countFiles(child), 0) ?? 0;
}

function readCompletedDocs() {
  try {
    return JSON.parse(localStorage.getItem('completedDocs') || '[]') as string[];
  } catch {
    return [];
  }
}

function badgeForType(type?: string) {
  if (!type) return '';
  return type.toUpperCase();
}

function matchesFileType(fileType: string | undefined, filter: FilterType) {
  if (filter === 'all') return true;
  if (filter === 'image') return ['png', 'jpg', 'jpeg', 'webp'].includes(fileType ?? '');
  return fileType === filter;
}

function TreeNode({
  node,
  depth,
  expanded,
  completed,
  nextDocId,
  onToggle,
  onOpen,
}: {
  node: DocNode;
  depth: number;
  expanded: Set<string>;
  completed: Set<string>;
  nextDocId: string | null;
  onToggle: (id: string) => void;
  onOpen: (node: DocNode) => void;
}) {
  const isFolder = node.type === 'folder';
  const isExpanded = expanded.has(node.id);
  const isDone = completed.has(node.id);
  const isNext = nextDocId === node.id;

  return (
    <div>
      <button
        type="button"
        onClick={() => (isFolder ? onToggle(node.id) : onOpen(node))}
        className={`doc-tree-row ${isNext ? 'border-[var(--brand-primary-border)] bg-[var(--brand-primary-soft)] text-white' : ''}`}
        style={{ paddingLeft: `${12 + depth * 18}px` }}
      >
        <span className="w-5 text-center text-[var(--text-muted)]" aria-hidden="true">
          {isFolder ? (isExpanded ? '−' : '+') : isDone ? '✓' : isNext ? '▶' : '•'}
        </span>
        <span className="min-w-0 flex-1 truncate text-left">{node.label}</span>
        {isFolder && <span className="badge">{countFiles(node)}</span>}
        {node.fileType && <span className="badge">{badgeForType(node.fileType)}</span>}
        {isNext && <span className="badge badge-yellow">próximo</span>}
        {isDone && <span className="badge badge-cyan">lido</span>}
      </button>

      {isFolder && isExpanded && (
        <div className="grid gap-1">
          {node.children?.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              completed={completed}
              nextDocId={nextDocId}
              onToggle={onToggle}
              onOpen={onOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DocTree({ nodes }: DocTreeProps) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(nodes.map((node) => node.id)));
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [activeNode, setActiveNode] = useState<DocNode | null>(null);
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');

  const files = useMemo(() => flattenFiles(nodes), [nodes]);
  const filteredFiles = useMemo(
    () =>
      files.filter((file) => {
        const typeOk = matchesFileType(file.fileType, typeFilter);
        const statusOk =
          statusFilter === 'all' ||
          (statusFilter === 'read' ? completed.has(file.id) : !completed.has(file.id));
        return typeOk && statusOk;
      }),
    [completed, files, statusFilter, typeFilter]
  );

  const nextDocId = files.find((file) => !completed.has(file.id))?.id ?? null;
  const nextDoc = files.find((file) => file.id === nextDocId) ?? null;
  const progress = files.length > 0 ? Math.round((completed.size / files.length) * 100) : 0;
  const readTime = Math.max(1, Math.round(completed.size * 0.35));

  useEffect(() => {
    setCompleted(new Set(readCompletedDocs()));
  }, []);

  useEffect(() => {
    localStorage.setItem('completedDocs', JSON.stringify(Array.from(completed)));
  }, [completed]);

  const toggle = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openNode = (node: DocNode) => setActiveNode(node);

  const closeActive = () => {
    if (activeNode) {
      setCompleted((current) => new Set(current).add(activeNode.id));
    }
    setActiveNode(null);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[310px_minmax(0,1fr)_320px]">
      <section className="surface-card p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="page-kicker">Trilhas</p>
            <h2 className="section-title">Árvore de aprendizagem</h2>
          </div>
          <span className="badge badge-blue">{progress}%</span>
        </div>

        <div className="grid gap-1">
          {nodes.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              depth={0}
              expanded={expanded}
              completed={completed}
              nextDocId={nextDocId}
              onToggle={toggle}
              onOpen={openNode}
            />
          ))}
        </div>

        <button type="button" className="btn-secondary mt-4 w-full">
          + Explorar outras trilhas
        </button>
      </section>

      <section className="surface-card p-4 md:p-5">
        <div className="mb-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="page-kicker">Biblioteca Técnica</p>
            <h1 className="app-title mt-1">Documentos guiados por trilha</h1>
            <p className="page-copy mt-1">
              Filtre documentos por tipo e status, leia na ordem recomendada e avance com evidência.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <label className="text-xs font-bold uppercase text-[var(--text-muted)]">
              Tipo
              <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as FilterType)} className="select-field mt-1">
                <option value="all">Todos</option>
                <option value="pdf">PDF</option>
                <option value="md">MD</option>
                <option value="txt">TXT</option>
                <option value="image">Imagem</option>
              </select>
            </label>

            <label className="text-xs font-bold uppercase text-[var(--text-muted)]">
              Status
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as FilterStatus)} className="select-field mt-1">
                <option value="all">Todos</option>
                <option value="pending">Pendentes</option>
                <option value="read">Lidos</option>
              </select>
            </label>
          </div>
        </div>

        <div className="surface-card-soft mb-4 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="page-kicker">Módulo em foco</p>
              <h2 className="section-title mt-1">Estrutura de documentos técnicos</h2>
              <p className="section-copy mt-1">
                {filteredFiles.length} documentos no filtro atual · {completed.size} lidos · {files.length - completed.size} pendentes
              </p>
            </div>
            <div className="min-w-[160px]">
              <div className="flex justify-between text-xs font-bold text-[var(--text-muted)]">
                <span>Progresso</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-track mt-2">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {filteredFiles.slice(0, 12).map((file) => {
            const isDone = completed.has(file.id);
            const isNext = file.id === nextDocId;

            return (
              <button
                key={file.id}
                type="button"
                onClick={() => openNode(file)}
                className={`surface-item text-left p-4 ${isNext ? 'ring-1 ring-[var(--brand-primary-border)]' : ''}`}
              >
                <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
                  <div>
                    <h3 className="text-sm font-extrabold text-white">{file.label}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--text-secondary)]">
                      Documento de estudo conectado à árvore da ENGELAB. Abra, leia e marque como lido ao fechar.
                    </p>
                  </div>
                  <span className="badge">{badgeForType(file.fileType)}</span>
                  <span className={`badge ${isDone ? 'badge-cyan' : isNext ? 'badge-yellow' : ''}`}>
                    {isDone ? 'Lido' : isNext ? 'Próximo' : 'Pendente'}
                  </span>
                  <span className="min-w-[72px] text-right text-xs font-black text-white">
                    {isDone ? '100%' : '0%'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {filteredFiles.length > 12 && (
          <p className="mt-4 text-center text-xs font-semibold text-[var(--text-muted)]">
            Exibindo 12 de {filteredFiles.length} documentos filtrados.
          </p>
        )}
      </section>

      <aside className="space-y-5">
        <section className="surface-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title">Seu progresso</h2>
            <span className="badge badge-blue">{completed.size}/{files.length}</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-[110px_1fr] xl:grid-cols-1">
            <div className="grid h-28 w-28 place-items-center rounded-full border-[10px] border-[rgba(17,103,255,0.24)] bg-black/20">
              <span className="text-2xl font-black text-white">{progress}%</span>
            </div>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-[var(--text-secondary)]">Documentos lidos</span>
                <strong>{completed.size}/{files.length}</strong>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[var(--text-secondary)]">Tempo estimado</span>
                <strong>{readTime}h</strong>
              </div>
              <p className="text-xs font-bold text-[#ffb86b]">🔥 Sequência atual: 2 dias</p>
            </div>
          </div>
        </section>

        <section className="focus-card p-5">
          <p className="page-kicker">Próximo documento recomendado</p>
          <h2 className="section-title mt-2">
            {nextDoc?.label ?? 'Todos os documentos foram lidos.'}
          </h2>
          <p className="section-copy mt-2">
            {nextDoc ? 'Siga a ordem sugerida para manter o aprendizado progressivo.' : 'Revise os materiais salvos ou avance para uma nova trilha.'}
          </p>
          {nextDoc && (
            <button type="button" onClick={() => openNode(nextDoc)} className="btn-primary mt-4 w-full">
              Continuar leitura →
            </button>
          )}
        </section>

        <section className="surface-card p-5">
          <h2 className="section-title">Conquistas da trilha</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-[var(--text-secondary)]">Primeiros passos</span>
              <strong className="text-[#56E609]">{completed.size > 0 ? 'Concluída' : 'Pendente'}</strong>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[var(--text-secondary)]">Leitor dedicado</span>
              <strong>{Math.min(completed.size, 10)}/10</strong>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[var(--text-secondary)]">Consistência</span>
              <strong>2/5</strong>
            </div>
          </div>
        </section>
      </aside>

      <DocModal
        isOpen={Boolean(activeNode)}
        onClose={closeActive}
        title={activeNode?.label ?? 'Documento'}
        fileUrl={activeNode?.url ?? null}
        fileType={activeNode?.fileType ?? 'pdf'}
      />
    </div>
  );
}
