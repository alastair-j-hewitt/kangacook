import { useState } from 'react';

// A form (rather than a bare button) so pressing Enter also searches.
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} role="search">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for recipes..."
        aria-label="Search recipes"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
