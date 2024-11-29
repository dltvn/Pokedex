export default function PokemonSearch({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search Pokemon..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full p-2 border-2 border-gray-300 rounded"
    />
  )
}

