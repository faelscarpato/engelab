'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { FileType } from '../lib/types/library';

interface DocModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileUrl: string | null;
  fileType: FileType;
}

type PointerPosition = {
  x: number;
  y: number;
};

type ImageTransform = {
  scale: number;
  x: number;
  y: number;
};

function isTextFile(fileType: FileType) {
  return fileType === 'md' || fileType === 'txt';
}

function officeViewerUrl(fileUrl: string) {
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
}

function pdfViewerUrl(fileUrl: string) {
  return `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(fileUrl)}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function distance(a: PointerPosition, b: PointerPosition) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function midpoint(a: PointerPosition, b: PointerPosition) {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
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
  const [imageTransform, setImageTransform] = useState<ImageTransform>({
    scale: 1,
    x: 0,
    y: 0,
  });
  const pointersRef = useRef<Map<number, PointerPosition>>(new Map());
  const gestureRef = useRef({
    startDistance: 0,
    startScale: 1,
    startX: 0,
    startY: 0,
    startMidX: 0,
    startMidY: 0,
    panStartX: 0,
    panStartY: 0,
    panOriginX: 0,
    panOriginY: 0,
  });
  const titleId = useMemo(
    () => `doc-modal-${title.replace(/\W+/g, '-').toLowerCase()}`,
    [title]
  );

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

  useEffect(() => {
    pointersRef.current.clear();
    setImageTransform({ scale: 1, x: 0, y: 0 });
  }, [fileUrl, isOpen]);

  const zoomImage = (delta: number) => {
    setImageTransform((current) => {
      const scale = clamp(current.scale + delta, 1, 5);

      return {
        scale,
        x: scale === 1 ? 0 : current.x,
        y: scale === 1 ? 0 : current.y,
      };
    });
  };

  const resetImageZoom = () => {
    pointersRef.current.clear();
    setImageTransform({ scale: 1, x: 0, y: 0 });
  };

  const syncGestureStart = (nextTransform = imageTransform) => {
    const pointers = Array.from(pointersRef.current.values());

    if (pointers.length >= 2) {
      const mid = midpoint(pointers[0], pointers[1]);
      gestureRef.current = {
        ...gestureRef.current,
        startDistance: distance(pointers[0], pointers[1]),
        startScale: nextTransform.scale,
        startX: nextTransform.x,
        startY: nextTransform.y,
        startMidX: mid.x,
        startMidY: mid.y,
      };
      return;
    }

    if (pointers.length === 1) {
      gestureRef.current = {
        ...gestureRef.current,
        panStartX: pointers[0].x,
        panStartY: pointers[0].y,
        panOriginX: nextTransform.x,
        panOriginY: nextTransform.y,
      };
    }
  };

  const handleImagePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    syncGestureStart();
  };

  const handleImagePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(event.pointerId)) return;

    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const pointers = Array.from(pointersRef.current.values());

    if (pointers.length >= 2) {
      event.preventDefault();
      const mid = midpoint(pointers[0], pointers[1]);
      const scale = clamp(
        gestureRef.current.startScale *
          (distance(pointers[0], pointers[1]) /
            Math.max(gestureRef.current.startDistance, 1)),
        1,
        5
      );

      setImageTransform({
        scale,
        x: scale === 1 ? 0 : gestureRef.current.startX + (mid.x - gestureRef.current.startMidX),
        y: scale === 1 ? 0 : gestureRef.current.startY + (mid.y - gestureRef.current.startMidY),
      });
      return;
    }

    if (pointers.length === 1 && imageTransform.scale > 1) {
      event.preventDefault();
      setImageTransform((current) => ({
        ...current,
        x: gestureRef.current.panOriginX + (pointers[0].x - gestureRef.current.panStartX),
        y: gestureRef.current.panOriginY + (pointers[0].y - gestureRef.current.panStartY),
      }));
    }
  };

  const handleImagePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId);
    syncGestureStart(imageTransform);
  };

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
            <iframe src={pdfViewerUrl(fileUrl)} title={title} className="doc-frame" />
          ) : fileType === 'png' || fileType === 'webp' || fileType === 'svg' ? (
            <>
              <div className="doc-image-toolbar">
                <button type="button" onClick={() => zoomImage(-0.25)} className="btn-secondary !min-h-10">
                  Reduzir
                </button>
                <span className="badge">{Math.round(imageTransform.scale * 100)}%</span>
                <button type="button" onClick={() => zoomImage(0.25)} className="btn-secondary !min-h-10">
                  Ampliar
                </button>
                <button type="button" onClick={resetImageZoom} className="btn-ghost !min-h-10">
                  Resetar
                </button>
              </div>
              <div
                className="doc-image-wrap"
                onPointerDown={handleImagePointerDown}
                onPointerMove={handleImagePointerMove}
                onPointerUp={handleImagePointerEnd}
                onPointerCancel={handleImagePointerEnd}
                onDoubleClick={() =>
                  setImageTransform((current) =>
                    current.scale === 1 ? { scale: 2, x: 0, y: 0 } : { scale: 1, x: 0, y: 0 }
                  )
                }
              >
                <img
                  src={fileUrl}
                  alt={title}
                  loading="lazy"
                  draggable={false}
                  className="doc-image"
                  style={{
                    transform: `translate3d(${imageTransform.x}px, ${imageTransform.y}px, 0) scale(${imageTransform.scale})`,
                  }}
                />
              </div>
            </>
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
              {status === 'loading'
                ? 'Carregando conteúdo...'
                : status === 'error'
                ? 'Não foi possível carregar este texto.'
                : textContent}
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
