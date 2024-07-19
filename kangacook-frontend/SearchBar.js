
import React, { useState } from 'react';

// Component to search for recipes
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Handle search button click
  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
