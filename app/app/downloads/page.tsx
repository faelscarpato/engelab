/*
 * Página de Downloads no design system. Os downloads continuam como
 * placeholders do MVP.
 */
'use client';

import { downloads } from '../../../data/downloads';

export default function DownloadsPage() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <p className="page-kicker">Downloads</p>
        <h1 className="app-title">Materiais contextualizados</h1>
        <p className="page-copy">
          Arquivos de apoio com indicação de quando usar, como estudar e aviso técnico.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {downloads.map((item) => (
          <article key={item.id} className="surface-card p-4">
            <div className="flex gap-4">
              <span className="icon-tile mt-1">↓</span>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="badge badge-blue">{item.category}</span>
                  <span className="badge">{item.relatedTrail}</span>
                </div>
                <h2 className="text-base font-extrabold text-[var(--text-primary)]">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {item.description}
                </p>

                <div className="mt-4 grid gap-3">
                  <div className="surface-card-soft p-3">
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                      Quando usar
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                      {item.whenToUse}
                    </p>
                  </div>
                  <div className="surface-card-soft p-3">
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                      Como estudar
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                      {item.howToStudy}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-5 text-[var(--text-muted)]">
                  {item.technicalNotice}
                </p>

                <button
                  type="button"
                  onClick={() => alert('Download indisponível no MVP')}
                  className="btn-primary mt-4 !min-h-10 !px-4"
                >
                  Baixar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
