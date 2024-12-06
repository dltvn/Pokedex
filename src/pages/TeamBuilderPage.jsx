import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonSearch from "../components/PokemonSearch";
import PokemonGrid from "../components/PokemonGrid";
import TeamPokemon from "../components/TeamPokemon";
import TeamList from "../components/TeamList";
import PokemonModal from "../components/PokemonModal";

export default function TeamBuilderPage() {
  const [teams, setTeams] = useState([
    { id: 1, name: "Team #1", pokemon: [] },
    { id: 2, name: "Team #2", pokemon: [] },
    { id: 3, name: "Team #3", pokemon: [] },
    { id: 4, name: "Team #4", pokemon: [] },
    { id: 5, name: "Team #5", pokemon: [] },
    { id: 6, name: "Team #6", pokemon: [] },
  ]);
  const [selectedTeam, setSelectedTeam] = useState(1);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pokemonUrl, setPokemonUrl] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state

  useEffect(() => {
    fetchPokemonList();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter(({ pokemon }) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [searchTerm, pokemonList]);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown
  };

  const handlePokemonClick = (pokemon) => {
    setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`);
    setModalIsOpen(true);
  };

  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery);
  };

  const addToTeam = (newPokemon) => {
    if (selectedTeam === 0) return;
    setTeams(
      teams.map((team) => {
        if (team.id === selectedTeam && team.pokemon.length < 6) {
          return {
            ...team,
            pokemon: [...team.pokemon, newPokemon],
          };
        }
        return team;
      })
    );
  };

  const removeFromTeam = (pokemonIndex) => {
    setTeams(
      teams.map((team) => {
        if (team.id === selectedTeam) {
          return {
            ...team,
            pokemon: team.pokemon.filter((_, index) => index !== pokemonIndex),
          };
        }
        return team;
      })
    );
  };

  const updateTeamName = (teamId, newName) => {
    setTeams(
      teams.map((team) =>
        team.id === teamId ? { ...team, name: newName } : team
      )
    );
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return ( 
    <div className="flex flex-col md:flex-row gap-4 md:p-4 bg-[#f8f0f0] min-h-screen">
      {/* Mobile Dropdown Menu */}
      <div className="md:hidden relative">
        <div
          onClick={toggleDropdown}
          className=" teamMenu cursor-pointer text-black px-4 py-2 flex justify-between items-center"
        >
          <span>{teams.find((team) => team.id === selectedTeam)?.name}</span>
          <span>{isDropdownOpen ? "▲" : "▼"}</span>
        </div>
        {isDropdownOpen && (
          <div className="absolute left-0 w-full shadow-lg mt-2 z-10 h-[calc(100vh-50px)] bg-poke_blue bg-opacity-20 backdrop-blur-md ">
            <div className="fixed inset-0 m-4 items-center">
            <TeamList
              teams={teams}
              selectedTeam={selectedTeam}
              onSelectTeam={(teamId) => {
                setSelectedTeam(teamId);
                toggleDropdown();
              }}
              onUpdateTeamName={updateTeamName}
        />
        </div>
            {/* {teams.map((team) => (
              <div
                key={team.id}
                onClick={() => selectTeam(team.id)}
                className={`cursor-pointer px-4 py-2 border-b hover:bg-gray-100 ${
                  selectedTeam === team.id ? "bg-poke_blue text-white" : ""
                }`}
              >
                {team.name}
              </div>
            ))} */}
          </div>
          
        // <TeamList
        //   teams={teams}
        //   selectedTeam={selectedTeam}
        //   onSelectTeam={setSelectedTeam}
        //   onUpdateTeamName={updateTeamName}
        // />




        )}
      </div>
      <div className="hidden md:block">
        <TeamList
          teams={teams}
          selectedTeam={selectedTeam}
          onSelectTeam={setSelectedTeam}
          onUpdateTeamName={updateTeamName}
        />
      </div>

      <div className="flex-1 space-y-6">
        <div className="hidden md:block">
          <PokemonSearch searchTerm={searchTerm} onSearchChange={handleSearch} />
        </div>
        
        <div className="aspect-square flex flex-col-2 text-center text-xl md:text-2xl cursor-pointer">
          <TeamPokemon
            team={teams[selectedTeam - 1]}
            onRemovePokemon={removeFromTeam}
            onPokemonClick={handlePokemonClick}
          />
        </div>

        {/* <div className="hidden md:block"> */}
          <PokemonGrid
            pokemon={filteredPokemon}
            onPokemonClick={(pokemon) => {
              addToTeam(pokemon);
            }}
          />

      </div>

      


      {modalIsOpen && (
        <PokemonModal
          pokemonUrl={pokemonUrl}
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
      )}
    </div>
  );
}

