import { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h2 className="section-title">{title}</h2>
      <p className="section-copy mx-auto mt-2 max-w-md">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
