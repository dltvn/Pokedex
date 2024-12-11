export default function PokemonSearch({ searchTerm, onSearchChange }) { // Seach bar function in Team builder Page
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="searchInput border-2"
    />
  );
}

