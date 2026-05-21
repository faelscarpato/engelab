'use client';

import { useEffect, useMemo, useState } from 'react';
import DocModal from './DocModal';
import type { DocNode } from '../lib/data/doc-tree';

interface DocTreeProps {
  nodes: DocNode[];
}

function flattenFiles(nodes: DocNode[]) {
  const files: DocNode[] = [];

  function visit(node: DocNode) {
    if (node.type === 'file') files.push(node);
    node.children?.forEach(visit);
  }

  nodes.forEach(visit);
  return files;
}

function readCompletedDocs() {
  try {
    return JSON.parse(localStorage.getItem('completedDocs') || '[]') as string[];
  } catch {
    return [];
  }
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
        className="doc-tree-row"
        style={{ paddingLeft: `${12 + depth * 18}px` }}
      >
        <span className="w-5 text-center text-[var(--text-muted)]" aria-hidden="true">
          {isFolder ? (isExpanded ? '−' : '+') : isDone ? '✓' : '•'}
        </span>
        <span className="min-w-0 flex-1 truncate text-left">{node.label}</span>
        {node.fileType && <span className="badge">{node.fileType.toUpperCase()}</span>}
        {isNext && <span className="badge badge-blue">próximo</span>}
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

  const files = useMemo(() => flattenFiles(nodes), [nodes]);
  const nextDocId = files.find((file) => !completed.has(file.id))?.id ?? null;
  const progress = files.length > 0 ? Math.round((completed.size / files.length) * 100) : 0;

  useEffect(() => {
    setCompleted(new Set(readCompletedDocs()));
  }, []);

  useEffect(() => {
    localStorage.setItem('completedDocs', JSON.stringify(Array.from(completed)));
  }, [completed]);

  const toggle = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const closeActive = () => {
    if (activeNode) {
      setCompleted((current) => new Set(current).add(activeNode.id));
    }
    setActiveNode(null);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <section className="surface-card p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="page-kicker">Árvore de documentos</p>
            <h2 className="section-title">Roteiro navegável</h2>
          </div>
          <span className="badge">{files.length} documentos</span>
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
              onOpen={setActiveNode}
            />
          ))}
        </div>
      </section>

      <aside className="space-y-5">
        <section className="surface-card p-5">
          <h2 className="section-title">Progresso de leitura</h2>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-3xl font-extrabold text-white">{progress}%</span>
            <span className="badge badge-cyan">{completed.size}/{files.length}</span>
          </div>
          <div className="progress-track mt-4">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </section>

        <section className="surface-card p-5">
          <h2 className="section-title">Próximo documento</h2>
          <p className="section-copy mt-2">
            {files.find((file) => file.id === nextDocId)?.label ?? 'Todos os documentos foram lidos.'}
          </p>
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
