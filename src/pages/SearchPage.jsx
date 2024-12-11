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
              Pokedex App
            </h1>
          </div>
          <p className="mt-6 text-black leading-relaxed">
            The Pokedex App is a dynamic and interactive tool designed for Pokemon enthusiasts. 
            It provides a comprehensive database of all Pokemon species, complete with detailed information on their abilities, types and stats. 
            Users can easily search for their favorite Pokemon, view high-quality images, and learn about their characteristics. 
            Additionally, the app allows users to create teams and play "Who's That Pokemon." 
            This app caters to both casual Pokemon fans and hardcore collectors, allowing them to track their progress, discover new Pokemon, and enhance their Pokemon experience. 
            Whether you're a newcomer to the series or a seasoned trainer, the Pokedex App brings the entire Pokemon universe to your fingertips.
          </p>
          <br></br>
          <p>
            Authors: @dltvn
            @joshua_mccann
            @john_doe
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
