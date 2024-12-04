export default function PokemonSearch({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={searchTerm} // Controlled input value
      onChange={(e) => onSearchChange(e.target.value)} // Updates searchTerm
      className="w-full p-3 border-2 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
