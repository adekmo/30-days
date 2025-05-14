'use client';

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';

type StatItem = {
  name: string;
  totalRecipes: number;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE', '#FE6CA8'];

const AdminStatsPage = () => {
    const [data, setData] = useState<StatItem[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
        const res = await fetch('/api/admin/stats');
        const result = await res.json();

        const formatted = result.map((item: any) => ({
            name: item.name,
            totalRecipes: Number(item.totalRecipes),
        }));

        console.log("📦 data:", formatted);

        setData(formatted);
        };

        fetchStats();
        setIsClient(true);
    }, []);

    const totalRecipes = data.reduce((sum, item) => sum + item.totalRecipes, 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">📊 Statistik Resep per Pengguna</h1>

      <p className="text-xl mb-4">Total Resep: <strong>{totalRecipes}</strong></p>

      <div className="w-full flex justify-center">
        {isClient && data.length > 0 && (
            <PieChart width={700} height={500}>
                <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="totalRecipes"
                nameKey="name"
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            )}
      </div>
    </div>
  )
}

export default AdminStatsPage