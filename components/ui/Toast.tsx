'use client';

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      <span aria-hidden="true">✓</span>
      <span>{message}</span>
    </div>
  );
}
