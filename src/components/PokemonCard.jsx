export default function PokemonCard({ pokemon, onRemove, onPokemonClick }) {
  const getBackgroundClass = (types) => {
    if (!types || types.length === 0) return "bg-poke_normal";

    if (types.length === 1) {
      return `bg-poke_${types[0].type.name}`;
    }

    return (
      "bg-gradient-to-r " +
      types
        .map(({ type: { name } }, i) => {
          if (i === 0) return `from-poke_${name}`;
          if (i === types.length - 1) return `to-poke_${name}`;
          return `via-poke_${name}`;
        })
        .join(" ")
    );
  };

  const backgroundClass = getBackgroundClass(pokemon.types);

  return (
    <div className="w-48 border-2 border-gray-300 bg-[#f0f0f0] relative hover:shadow-lg transition-shadow duration-300">
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full 
                   flex items-center justify-center hover:bg-red-600"
        >
          ×
        </button>
      )}
      <div
        className={`p-1 text-center font-mono text-sm border-b-2 border-gray-300 capitalize ${backgroundClass}`}
      >
        {pokemon.name}
      </div>
      <div className="p-8 flex items-center justify-center relative group">
        {/* Grey Circle Background */}
        <div className="absolute w-28 h-28 bg-gray-200 rounded-full z-0 group-hover:scale-110 transition-transform duration-300"></div>

        {/* Pokémon Image */}
        <img
          src={pokemon.sprites?.front_default || "/images/default-pokemon.png"}
          alt={pokemon.name}
          className="w-24 h-24 z-10 pixelated cursor-pointer transition-transform duration-300 group-hover:scale-125"
          style={{ imageRendering: "pixelated" }}
          onClick={onPokemonClick}
        />
      </div>
    </div>
  );
}
