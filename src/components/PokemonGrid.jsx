export default function PokemonGrid({ pokemon, onPokemonClick }) {
  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white p-4 border-2 border-gray-300 rounded-lg">
      <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto">
        {pokemon.map(({ pokemon }) => (
          <div
            key={pokemon.id}
            className={`relative w-12 h-12 cursor-pointer hover:bg-gray-200 active:bg-gray-300 p-1 rounded`}
            onClick={() => onPokemonClick(pokemon)}
          >
            <img
              src={pokemon.sprites.front_default || "/images/default-pokemon.png"}
              alt={pokemon.name}
              className="w-full h-full object-contain pixelated"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
