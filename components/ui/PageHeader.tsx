import { ReactNode } from 'react';

interface PageHeaderProps {
  kicker: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  variant?: 'plain' | 'hero';
  children?: ReactNode;
}

export default function PageHeader({
  kicker,
  title,
  description,
  actions,
  variant = 'plain',
  children,
}: PageHeaderProps) {
  const content = (
    <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
      <div className="page-header">
        <p className="page-kicker">{kicker}</p>
        <h1 className="app-title">{title}</h1>
        {description && <p className="page-copy">{description}</p>}
      </div>
      {actions}
      {children}
    </div>
  );

  if (variant === 'hero') {
    return <section className="surface-hero p-5 md:p-7">{content}</section>;
  }

  return content;
}
