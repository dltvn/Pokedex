import PokemonCard from './PokemonCard';

export default function TeamPokemon({ team, onRemovePokemon, onPokemonClick }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {team?.pokemon.map((pokemon, index) => (
        <PokemonCard
          key={`${pokemon.id}-${index}`}
          pokemon={pokemon}
          onRemove={() => onRemovePokemon(index)}
          onClick={() => onPokemonClick(pokemon.id)} // Pass the click handler
        />
      ))}
    </div>
  );
}
