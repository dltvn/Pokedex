import React, { useState } from "react";

export default function PokemonGrid({ pokemon, onAddToTeam, onPokemonClick }) {
  const [hoveredPokemon, setHoveredPokemon] = useState(null);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 shadow-lg z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 py-2 md:py-4 h-32 md:h-48 overflow-y-auto custom-scrollbar">
          {pokemon.map(({ pokemon }) => (
            <div
              key={pokemon.id}
              className={`flex flex-col items-center justify-center p-1 md:p-2 rounded-lg transition-all duration-300 ease-in-out cursor-pointer
                          ${hoveredPokemon === pokemon.id ? "bg-blue-100 scale-105" : "hover:bg-gray-100"}
                          border border-transparent hover:border-gray-300`}
              onMouseEnter={() => setHoveredPokemon(pokemon.id)}
              onMouseLeave={() => setHoveredPokemon(null)}
              onClick={(e) => {
                e.stopPropagation(); // Prevent the parent `onClick` from triggering
                onPokemonClick(pokemon);
              }}
            >
              <div className="text-center text-[10px] md:text-xs font-medium mb-1 truncate w-full capitalize">
                {pokemon.name}
              </div>
              <div className="relative w-8 h-8 md:w-12 md:h-12 bg-gray-200 rounded-full overflow-hidden">
                <img
                  src={pokemon.sprites.front_default || "/images/default-pokemon.png"}
                  alt={pokemon.name}
                  className="w-full h-full object-contain pixelated transform hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

