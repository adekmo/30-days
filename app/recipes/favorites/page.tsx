"use client"

import { useEffect, useState } from 'react';

const FavoritesRecipe = () => {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
          try {
            const res = await fetch('/api/recipes?favorite=true');
            if (!res.ok) throw new Error('Gagal fetch data favorit');
    
            const data = await res.json();
            setRecipes(data);
          } catch (error) {
            console.error('❌ Error fetch favorit:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchFavorites();
      }, []);
    
      if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Resep Favorit</h1>
      {recipes.length === 0 ? (
        <p>Belum ada resep favorit.</p>
      ) : (
        <ul className="space-y-4">
          {recipes.map((recipe: any) => (
            <li key={recipe._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p><strong>Bahan:</strong> {recipe.ingredients}</p>
              <p><strong>Cara membuat:</strong> {recipe.instructions}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FavoritesRecipe