import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonModal from "../components/PokemonModal";

function PokedexPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemonUrl, setPokemonUrl] = useState();
  const [search, setSearch] = useState("");
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
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/pokemon/users");
        console.log(response.data.pokemons)
        setPokemonList(response.data.pokemons || []);
      } catch (err) {
        console.error("Error fetching Pokémon list:", err);
        setError("Failed to load Pokémon list.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery)
    );

    //setFilteredPokemon(filtered);
  };

  if (loading) {
    return (
      <div className="bg-poke_gray min-h-screen flex items-center justify-center">
        <p>Loading Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-poke_gray min-h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-poke_gray min-h-screen flex flex-col">
                <input
            type="text"
            placeholder="Search..."
            className="searchInput"
            onChange={handleSearch}
          />
      <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
        {pokemonList.map(({pokemon}) => (
          <div
            key={pokemon.id}
            className="aspect-square flex flex-col"
            onClick={() => handlePokemonClick(pokemon.id)}
          >
            <h2 
            className={'bg-gradient-to-r ' +pokemon.types.map(({type: {name}}, i) => {
              if (i === 0) return `from-poke_${name}`; // 첫 번째 색상은 from
              if (i === pokemon.types.length - 1) return `to-poke_${name}`; // 마지막 색상은 to
              return `via-poke_${color}`; // 중간 색상은 via
            }).join(' ')}
            >
              {pokemon.name}
            </h2>
            <div className="flex-1 border-2 border-gray25 flex items-center justify-center">
            <img
              src={pokemon.sprites['front_default'] || "/images/default-pokemon.png"}
              alt={pokemon.name}
              className="mb-3 w-64"
            />
            </div>
          </div>
        ))}
      </div>
      <PokemonModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        pokemonUrl={pokemonUrl}
      />
    </div>
  );
}

export default PokedexPage;
