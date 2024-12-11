import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonModal from "../components/PokemonModal";
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

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
        <div className="hidden sm:block flex-1 p-8 text-xl">
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
<div className="mt-6 text-black leading-relaxed">
  <h2>Authors:</h2>
  <ul className="space-y-4">
    {[
      {
        name: "Denys",
        github: "https://github.com/dltvn",
        instagram: "https://instagram.com/dltvn",
        linkedin: "https://linkedin.com/in/dltvn",
      },
      {
        name: "Mina",
        github: "https://github.com/bellella",
        instagram: "https://www.instagram.com/minaacoco/",
        linkedin: "https://www.linkedin.com/in/mina-choi-a04818180/",
      },
      {
        name: "Jinal",
        github: "https://github.com/jinal108",
        instagram: "https://instagram.com/jinal108",
        linkedin: "https://www.linkedin.com/in/jinal-patel-490293298/",
      },
      {
        name: "Peggy",
        github: "https://github.com/peggy8337",
        instagram: "https://instagram.com/peggy8337",
        linkedin: "https://www.linkedin.com/in/pei-chi-tseng-1364a0290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      },
      {
        name: "Saaram",
        github: "https://github.com/SaaramRashidi",
        instagram: "https://www.instagram.com/saaramrashidi/",
        linkedin: "https://www.linkedin.com/in/saaramrashidi/",
      },
    ].map((author, index) => (
      <li key={index} className="text-sm">
        <span className="font-semibold">{author.name}:</span>{" "}
        <div className="inline-flex items-center space-x-2">
          <a
            href={author.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={author.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition-colors"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </li>
    ))}
  </ul>
</div>

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
