
import React, { useEffect, useState } from 'react';

// Component to display a list of recipes
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes from the backend API when the component mounts
  useEffect(() => {
    fetch('/api/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data));
  }, []);

  return (
    <div>
      <h1>Recipe List</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
