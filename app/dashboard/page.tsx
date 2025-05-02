import Button from '@/components/Button'
import Cards from '@/components/Cards'
import Dashboard from '@/layouts/Dashboard'
import React from 'react'

const DashboardPage = () => {
  return (
    <Dashboard>
        <h1 className="text-3xl font-bold mb-6">Halaman Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Cards title="Statistik" content="Total pengguna: 1200" />
            <Cards title="Aktivitas" content="20 pengguna aktif hari ini" />
        </div>
        <div className="mt-6">
            <Button label="Lihat Detail" />
        </div>
    </Dashboard>
  )
}

export default DashboardPage