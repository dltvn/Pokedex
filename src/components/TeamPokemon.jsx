import React from 'react';
import PokemonCard from './PokemonCard';

export default function TeamPokemon({ team, onRemovePokemon, onPokemonClick }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {team.pokemon.map((pokemon, index) => (
        <PokemonCard
          key={index}
          pokemon={pokemon}
          onRemove={() => onRemovePokemon(index)}
          onPokemonClick={() => onPokemonClick(pokemon)}
        />
      ))}
      {[...Array(6 - team.pokemon.length)].map((_, index) => (
        <div key={`empty-${index}`} className="w-48 h-48 border-2 border-gray-300 bg-[#f0f0f0]"></div>
      ))}
    </div>
  );
}

