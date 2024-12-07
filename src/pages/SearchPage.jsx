import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonModal from "../components/PokemonModal";

const MAX_POKEMON = 300;

function SearchPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonUrl, setPokemonUrl] = useState();
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null); 

  const handlePokemonClick = async (url) => {
    try {
      setPokemonUrl(url);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    }
  };


  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit="+MAX_POKEMON);
        setPokemonList(response.data.results);
        setFilteredPokemon(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();

    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery)
    );

    setFilteredPokemon(filtered);
  };

  return (
    <div className="bg-poke_gray flex flex-col">
      {/* Header */}

      {/* Content */}
      <main className="flex">
        {/* Left Panel */}
        <div className="flex-1 border-r-2 border-black">
          <input
            type="text"
            placeholder="Search..."
            className="searchInput"
            onChange={handleSearch}
          />
          <ul className="p-5 flex flex-col gap-5 overflow-y-auto h-[calc(100vh-100px)]">
            {filteredPokemon
              .map((pokemon, i) => (
                <li
                  key={i}
                  className="p-3 border-2 rounded border-gray25 cursor-pointer capitalize"
                  onClick={() => handlePokemonClick(pokemon.url)}
                >
                  {pokemon.name}
                </li>
              ))}
          </ul>
        </div>

        {/* Right Panel */}
        <div className="hidden sm:block flex-1 p-8">
          <div className="text-center">
            <h1 className="app-title">
              App Name Placeholder
            </h1>
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </main>
      <PokemonModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        pokemonUrl={pokemonUrl}
      />
    </div>
  );
}

export default SearchPage;
