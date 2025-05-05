// components/DashboardSidebar.tsx
import Link from 'next/link';
import React from 'react';

const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-2">
          <li><Link href="/dashboard" className="hover:underline">Beranda</Link></li>
          <li><Link href="/profile" className="hover:underline">Profil</Link></li>
          <li><Link href="/dashboard/setting" className="hover:underline">Pengaturan</Link></li>
        </ul>
    </aside>
  );
};

export default DashboardSidebar;
