
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import SearchBar from './SearchBar';

const App = () => {
  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Implement search functionality here
  };

  return (
    <Router>
      <div>
        <h1>Kangacook</h1>
        <SearchBar onSearch={handleSearch} />
        <Switch>
          <Route path="/recipes/:id" component={RecipeDetail} />
          <Route path="/" component={RecipeList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
