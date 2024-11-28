export default function PokemonGrid({ pokemon, onPokemonClick }) {
  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white p-4 border-2 border-gray-300 rounded-lg">
      <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto">
        {pokemon.map((pokemon) => (
          <img
            key={pokemon.id}
            src={pokemon.sprite}
            alt={pokemon.name}
            className="w-12 h-12 pixelated cursor-pointer hover:bg-gray-100 p-1 rounded"
            onClick={() => onPokemonClick(pokemon)}
          />
        ))}
      </div>
    </div>
  )
}

