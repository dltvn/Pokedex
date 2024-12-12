import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonModal from "../components/PokemonModal";

function PokedexPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemonUrl, setPokemonUrl] = useState();
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handlePokemonClick = async (id) => {
    try {
      setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/pokemon/users");
      setPokemonList(response.data.pokemons || []);
      setFilteredPokemon(response.data.pokemons || []);
    } catch (err) {
      console.error("Error fetching Pokémon list:", err);
      setError("Failed to load Pokémon list.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filtered = pokemonList.filter(({ pokemon }) =>
      pokemon.name.toLowerCase().includes(searchQuery)
    );

    setFilteredPokemon(filtered);
  };

  if (error) {
    return (
      <div className="bg-poke_gray min-h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-poke_gray min-h-screen h-full flex flex-col pb-8">
      <input
        type="text"
        placeholder="Search..."
        className="searchInput"
        onChange={handleSearch}
      />
      {loading ? (
        <p className="absolute top-1/2 transform -translate-y-1/2 text-center w-full">
          Loading Pokémon...
        </p>
      ) : (
        <div className="flex-1 mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
          {filteredPokemon.map(({ pokemon }, i) => (
            <div
              key={i}
              className="aspect-square border-2 rounded border-gray25 flex flex-col text-center text-xl md:text-2xl cursor-pointer"
              onClick={() => handlePokemonClick(pokemon.id)}
            >
              <h2
                className={"capitalize " +
                  (pokemon.types.length === 1
                    ? `bg-poke_${pokemon.types[0].type.name}`
                    : "bg-gradient-to-r " +
                      pokemon.types
                        .map(({ type: { name } }, i) => {
                          if (i === 0) return `from-poke_${name}`;
                          if (i === pokemon.types.length - 1)
                            return `to-poke_${name}`;
                          return `via-poke_${name}`;
                        })
                        .join(" "))
                }
              >
                {pokemon.name}
              </h2>

              <div className="flex-1 border-t-2 border-gray25 flex items-center justify-center">
                <img
                  src={
                    pokemon.sprites.other['official-artwork'].front_default ||
                    "/images/default-pokemon.png"
                  }
                  alt={pokemon.name}
                  className="mb-3 w-64"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <PokemonModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onCatch={() => fetchPokemonList()}
        pokemonUrl={pokemonUrl}
      />
    </div>
  );
}

export default PokedexPage;
