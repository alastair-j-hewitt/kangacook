import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJson } from './api';

// Lists recipes, filtered by the search query through the API's ?search= parameter.
const RecipeList = ({ query }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const search = query ? `?search=${encodeURIComponent(query)}` : '';
    getJson(`/api/recipes/${search}`, controller.signal)
      .then((data) => {
        setRecipes(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      });
    return () => controller.abort();
  }, [query]);

  if (error) {
    return <p role="alert">Could not load recipes: {error}</p>;
  }

  return (
    <section>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecipeList;
