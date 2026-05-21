'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomCreateSheet from './BottomCreateSheet';
import GlobalPromptBuilder from './GlobalPromptBuilder';
import ContextualChecklist from './ContextualChecklist';

export default function ClientShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showAppShell = pathname.startsWith('/app');

  if (!showAppShell) {
    return <>{children}</>;
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-content">
        <Header />
        <main className="app-main">{children}</main>
        <ContextualChecklist />
        <GlobalPromptBuilder />
        <BottomCreateSheet />
      </div>
    </div>
  );
}
