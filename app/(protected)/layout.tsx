import DashboardSidebar from '@/components/DashboardSidebar';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}