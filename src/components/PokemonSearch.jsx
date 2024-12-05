export default function PokemonSearch({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={searchTerm} // Controlled input value
      onChange={(e) => onSearchChange(e.target.value)} // Updates searchTerm
      className="w-full p-4 border-2 border-gray-400 rounded-lg text-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-md transition-all duration-300 bg-white hover:border-blue-500"
    />
  );
}
