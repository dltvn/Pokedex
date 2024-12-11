import React from 'react';
import PokemonCard from './PokemonCard';

export default function TeamPokemon({ team, onRemovePokemon, onPokemonClick }) {
  const pokemonList = team?.pokemon || []; // Fallback to ensure `team.pokemon` is always defined
  const emptySlots = Math.max(6 - pokemonList.length, 0); // Calculate number of empty slots

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-4">
      {pokemonList.map((pokemon, index) => ( // Render PokemonCard for each Pokemon in the team
        <PokemonCard
          key={index}
          pokemon={pokemon}
          onRemove={() => onRemovePokemon(index)}
          onPokemonClick={() => onPokemonClick(pokemon)}
        />
      ))}
      {[...Array(emptySlots)].map((_, index) => ( // Render empty slots
        <div
          key={`empty-${index}`}
          style={{ width: '147.5px', height: '96px' }}
          className="flex items-center justify-center border-2 border-gray-300 bg-[#f0f0f0] text-gray-500 text-sm"
        >
          Add Pokémon
        </div>
      ))}
    </div>
  );
}
