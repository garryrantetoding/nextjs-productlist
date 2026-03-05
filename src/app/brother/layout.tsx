// app/brother/layout.tsx
import React from 'react';
import Sidebar from '@/components/brotherPage/sidebar';
import Topbar from '@/components/brotherPage/topbar';
import { Toaster } from 'sonner';
export default function BrotherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="">{children}</main>
        <Toaster />

      </div>
    </div>
  );
}
