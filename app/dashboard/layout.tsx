// app/dashboard/layout.tsx
import React from 'react';
import { ReactNode } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar'; // contoh komponen sidebar

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
