export default function PokemonSearch({ searchTerm, onSearchChange }) { // Seach bar function in Team builder Page
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full p-2 md:p-4 border-2 border-gray-400 rounded-lg text-base md:text-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-md transition-all duration-300 bg-white hover:border-blue-500"
    />
  );
}

