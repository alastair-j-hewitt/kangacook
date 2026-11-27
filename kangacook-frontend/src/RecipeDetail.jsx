import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getJson } from './api';

// Shows one recipe. The API returns ingredients both as text and as a list.
const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    getJson(`/api/recipes/${id}/`, controller.signal)
      .then((data) => {
        setRecipe(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      });
    return () => controller.abort();
  }, [id]);

  if (error) {
    return <p role="alert">Could not load recipe: {error}</p>;
  }
  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <article>
      <h2>{recipe.title}</h2>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients_list.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
      <Link to="/">Back to all recipes</Link>
    </article>
  );
};

export default RecipeDetail;
