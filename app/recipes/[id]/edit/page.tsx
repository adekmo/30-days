"use client"

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const EditRecipes = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
          const res = await fetch(`/api/recipes/${id}`);
          const data = await res.json();
          setTitle(data.title);
          setIngredients(data.ingredients);
          setInstructions(data.instructions);
          setLoading(false);
        };
        fetchRecipe();
      }, [id]);

      const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const res = await fetch(`/api/recipes/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, ingredients, instructions }),
        });
    
        if (res.ok) {
          router.push('/recipes');
        } else {
          const { message } = await res.json();
          alert(`Gagal update: ${message}`);
        }
      };
    
      if (loading) return <p>Memuat...</p>;

  return (
    <form onSubmit={handleUpdate} className="space-y-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">Edit Resep</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul"
        className="w-full border p-2"
        required
      />
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Bahan-bahan"
        className="w-full border p-2"
        required
      />
      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Langkah-langkah"
        className="w-full border p-2"
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Simpan Perubahan
      </button>
    </form>
  )
}

export default EditRecipes