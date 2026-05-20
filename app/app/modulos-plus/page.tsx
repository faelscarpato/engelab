/*
 * Página dos Módulos Plus com estados bloqueados claros.
 */
'use client';

import { modulesPlus } from '../../../data/modulesPlus';

export default function ModulosPlusPage() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <p className="page-kicker">Módulos Plus</p>
        <h1 className="app-title">Conteúdos avançados</h1>
        <p className="page-copy">
          Módulos preparados para fases futuras, com bloqueio visual explícito
          para evitar expectativa indevida no MVP.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {modulesPlus.map((module) => (
          <article
            key={module.id}
            className={`surface-card p-5 ${module.blocked ? 'opacity-80' : ''}`}
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="badge badge-purple">{module.level}</span>
              {module.blocked && <span className="badge badge-orange">Bloqueado</span>}
            </div>

            <h2 className="section-title">{module.title}</h2>
            <p className="section-copy mt-2">{module.description}</p>

            <button
              type="button"
              className={`mt-5 ${module.blocked ? 'btn-secondary pointer-events-none opacity-70' : 'btn-primary'}`}
              aria-disabled={module.blocked}
            >
              {module.blocked ? 'Indisponível no plano atual' : 'Abrir módulo'}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
