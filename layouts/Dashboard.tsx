import React from 'react'

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline">Menu 1</a></li>
          <li><a href="#" className="hover:underline">Menu 2</a></li>
        </ul>
      </aside>
      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>
    </div>
  )
}

export default Dashboard