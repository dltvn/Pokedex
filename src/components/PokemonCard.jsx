export default function PokemonCard({ pokemon, onRemove }) {
  const typeColors = {
    grass: "bg-green-300",
    fire: "bg-red-300",
    water: "bg-blue-300",
    electric: "bg-yellow-300",
    psychic: "bg-pink-300",
    dragon: "bg-orange-300",
    normal: "bg-gray-300",
    bug: "bg-lime-300",
    poison: "bg-purple-300",
    ground: "bg-amber-300",
    fairy: "bg-pink-200",
    fighting: "bg-red-400",
    rock: "bg-yellow-600",
    ghost: "bg-purple-400",
    ice: "bg-blue-200",
    steel: "bg-gray-400",
    dark: "bg-gray-600",
    flying: "bg-indigo-300"
  }

  return (
    <div className="w-48 border-2 border-gray-300 bg-[#f0f0f0] relative">
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full 
                   flex items-center justify-center hover:bg-red-600"
        >
          ×
        </button>
      )}
      <div className={`p-1 text-center font-mono text-sm border-b-2 border-gray-300 ${typeColors[pokemon.type]}`}>
        {pokemon.name}
      </div>
      <div className="p-8 flex items-center justify-center">
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="w-24 h-24 pixelated"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
    </div>
  )
}
