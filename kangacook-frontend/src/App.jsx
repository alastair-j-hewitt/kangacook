import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import RecipeDetail from './RecipeDetail';
import RecipeList from './RecipeList';
import SearchBar from './SearchBar';

const App = () => {
  const [query, setQuery] = useState('');

  return (
    <BrowserRouter>
      <h1>
        <Link to="/">Kangacook</Link>
      </h1>
      <SearchBar onSearch={setQuery} />
      <Routes>
        <Route path="/" element={<RecipeList query={query} />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
