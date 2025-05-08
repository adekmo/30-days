"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
          try {
            // const res = await fetch('/api/recipes');
            const query = search ? `?search=${encodeURIComponent(search)}` : "";
            const res = await fetch(`/api/recipes${query}`);
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
      }, [search]);

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
      <input
        type="text"
        placeholder="Cari resep..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 mb-4 w-full max-w-md"
      />
      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p>Tidak ada resep ditemukan.</p>
      ) : (
        <ul className="space-y-4">
          {recipes.map((recipe: any) => (
            <li key={recipe._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p><strong>Bahan:</strong> {recipe.ingredients}</p>
              <p><strong>Cara membuat:</strong> {recipe.instructions}</p>
              <Link href={`/recipes/${recipe._id}/edit`} className="text-blue-600 hover:underline mr-2">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(recipe._id)}
                className="text-red-600 hover:underline"
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