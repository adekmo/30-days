"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
          try {
            const res = await fetch('/api/recipes');
            if (!res.ok) throw new Error('Gagal fetch');
    
            const data = await res.json();
            setRecipes(data);
          } catch (err) {
            console.error('❌ Gagal fetch resep:', err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchRecipes();
      }, []);

      const handleDelete = async (id: string) => {
        if (!confirm('Yakin ingin menghapus resep ini?')) return;
      
        try {
          const res = await fetch(`/api/recipes/${id}`, {
            method: 'DELETE',
          });
      
          if (!res.ok) {
            const { message } = await res.json();
            alert(`Gagal menghapus: ${message}`);
            return;
          }
      
          // Perbarui list resep setelah berhasil hapus
          setRecipes((prev) => prev.filter((recipe: any) => recipe._id !== id));
        } catch (err) {
          console.error('❌ Gagal hapus resep:', err);
          alert('Gagal menghapus resep.');
        }
      };
    
      if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Resep Saya</h1>
      {recipes.length === 0 ? (
        <p>Belum ada resep ditambahkan.</p>
      ) : (
        <ul className="space-y-4">
          {recipes.map((recipe: any) => (
            <li key={recipe._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p><strong>Bahan:</strong> {recipe.ingredients}</p>
              <p><strong>Cara membuat:</strong> {recipe.instructions}</p>
              <button
                onClick={() => handleDelete(recipe._id)}
                className="mt-2 text-sm text-red-600 hover:underline"
                >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RecipesPage