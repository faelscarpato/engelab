'use client';

import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { FileType } from '../lib/types/library';

interface DocModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileUrl: string | null;
  fileType: FileType;
}

function isTextFile(fileType: FileType) {
  return fileType === 'md' || fileType === 'txt';
}

function officeViewerUrl(fileUrl: string) {
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
}

export default function DocModal({
  isOpen,
  onClose,
  title,
  fileUrl,
  fileType,
}: DocModalProps) {
  const [textContent, setTextContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const titleId = useMemo(() => `doc-modal-${title.replace(/\W+/g, '-').toLowerCase()}`, [title]);

  useEffect(() => {
    if (!isOpen || !fileUrl || !isTextFile(fileType)) {
      setTextContent('');
      setStatus('idle');
      return;
    }

    let active = true;

    setStatus('loading');
    fetch(fileUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Falha ao carregar conteúdo.');
        return response.text();
      })
      .then((text) => {
        if (!active) return;
        setTextContent(text);
        setStatus('idle');
      })
      .catch(() => {
        if (!active) return;
        setStatus('error');
      });

    return () => {
      active = false;
    };
  }, [fileType, fileUrl, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="doc-modal-panel">
        <header className="doc-modal-header">
          <div className="min-w-0">
            <p className="page-kicker">Visualização</p>
            <h2 id={titleId} className="section-title truncate">
              {title}
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {fileUrl && (
              <a href={fileUrl} target="_blank" rel="noreferrer" className="btn-secondary !min-h-10">
                Abrir em nova aba
              </a>
            )}
            <button type="button" onClick={onClose} className="btn-ghost !min-h-10">
              Fechar
            </button>
          </div>
        </header>

        <div className="doc-modal-body">
          {!fileUrl ? (
            <div className="empty-state">
              <h3 className="section-title">Arquivo indisponível</h3>
              <p className="section-copy mt-2">Este item ainda não possui URL de visualização.</p>
            </div>
          ) : fileType === 'pdf' ? (
            <iframe src={fileUrl} title={title} className="doc-frame" />
          ) : fileType === 'png' || fileType === 'webp' || fileType === 'svg' ? (
            <div className="doc-image-wrap">
              <img src={fileUrl} alt={title} loading="lazy" className="doc-image" />
            </div>
          ) : fileType === 'docx' ? (
            <iframe src={officeViewerUrl(fileUrl)} title={title} className="doc-frame" />
          ) : fileType === 'md' ? (
            <article className="doc-text doc-markdown">
              {status === 'loading' && <p>Carregando conteúdo...</p>}
              {status === 'error' && <p>Não foi possível carregar este Markdown.</p>}
              {status === 'idle' && <ReactMarkdown>{textContent}</ReactMarkdown>}
            </article>
          ) : fileType === 'txt' ? (
            <pre className="doc-text whitespace-pre-wrap">
              {status === 'loading' ? 'Carregando conteúdo...' : status === 'error' ? 'Não foi possível carregar este texto.' : textContent}
            </pre>
          ) : (
            <div className="empty-state">
              <h3 className="section-title">Prévia não suportada</h3>
              <p className="section-copy mt-2">Abra o arquivo em uma nova aba para visualizar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
