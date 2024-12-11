import React from 'react';
import PokemonCard from './PokemonCard';

export default function TeamPokemon({ team, onRemovePokemon, onPokemonClick }) {
  // Fallback to ensure `team.pokemon` is always defined
  const pokemonList = team?.pokemon || [];
  const emptySlots = Math.max(6 - pokemonList.length, 0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
      {team.pokemon.map((pokemon, index) => (
        <PokemonCard
          key={index}
          pokemon={pokemon}
          onRemove={() => onRemovePokemon(index)}
          onPokemonClick={() => onPokemonClick(pokemon)}
        />
      ))}
      {[...Array(emptySlots)].map((_, index) => (
        <div key={`empty-${index}`} className="w-48 h-48 border-2 border-gray-300 bg-[#f0f0f0]"></div>
      ))}
    </div>
  );
}

