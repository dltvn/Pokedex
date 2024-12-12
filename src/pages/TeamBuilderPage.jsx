import React, { useState, useEffect, useMemo } from "react";   // Pokemon Team builder page imports
import axios from "axios";
import PokemonSearch from "../components/PokemonSearch";
import PokemonGrid from "../components/PokemonGrid";
import TeamPokemon from "../components/TeamPokemon";
import TeamList from "../components/TeamList";
import PokemonModal from "../components/PokemonModal";
import Dropdown from "../components/Dropdown";
import LoadingPage from "./LoadingPage";

export default function TeamBuilderPage() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(1);
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pokemonUrl, setPokemonUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => { // Local storage functionality
    const initTeams = () => {
      const storedTeams = JSON.parse(localStorage.getItem("teams"));
      if (storedTeams?.length === 6) {
        return storedTeams;
      }
      const defaultTeams = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        name: `Team ${i + 1}`,
        pokemon: [],
      }));
      localStorage.setItem("teams", JSON.stringify(defaultTeams));
      return defaultTeams;
    };

    const initializeData = async () => { // Grabbing pokemon that the user caught
      try {
        setLoading(true);
        setTeams(initTeams());

        const response = await axios.get("/api/pokemon/users");
        setPokemonList(response.data.pokemons || []);
      } catch (err) {
        console.error("Error fetching Pokémon list:", err);
        setError("Failed to load Pokémon list.");
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  useEffect(() => { // Alert message timing
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const filteredPokemon = useMemo(() => { // use memo hook to return the search and list
    return pokemonList.filter(({ pokemon }) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, pokemonList]);

  const addToTeam = (newPokemon) => { // adding pokemon to team
    setTeams((prevTeams) => {
      const currentTeam = prevTeams.find(team => team.id === selectedTeam);
      if (currentTeam && currentTeam.pokemon.length >= 6) {
        setAlertMessage("Team is full! You can't add more than 6 Pokémon.");
        return prevTeams;
      }
      const updatedTeams = prevTeams.map((team) => // Updating the team
        team.id === selectedTeam && team.pokemon.length < 6
          ? { ...team, pokemon: [...team.pokemon, newPokemon] }
          : team
      );
      localStorage.setItem("teams", JSON.stringify(updatedTeams));
      return updatedTeams;
    });
  };

  const removeFromTeam = (pokemonIndex) => { // Removing From team
    setTeams((prevTeams) => {
      const updatedTeams = prevTeams.map((team) =>
        team.id === selectedTeam
          ? {
              ...team,
              pokemon: team.pokemon.filter((_, index) => index !== pokemonIndex),
            }
          : team
      );
      localStorage.setItem("teams", JSON.stringify(updatedTeams));
      return updatedTeams;
    });
  };

  const updateTeamName = (teamId, newName) => {  // Team naming
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, name: newName } : team
      )
    );
  };

  if (loading) {
    return <LoadingPage />;
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-poke_gray">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#e6dfdd] min-h-screen flex flex-col md:flex-row gap-4 p-4">
      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <Dropdown
          teams={teams}
          selectedTeam={selectedTeam}
          onSelectTeam={setSelectedTeam}
          onUpdateTeamName={updateTeamName}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={() => setIsDropdownOpen((prevState) => !prevState)}
        />
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
        <div className="mb-4">
          <PokemonSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        <div className="relative z-0 p-4 md:p-8">
          <TeamPokemon
            team={teams.find((team) => team.id === selectedTeam)}
            onRemovePokemon={removeFromTeam}
            onPokemonClick={(pokemon) => {
              setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`);
              setModalIsOpen(true);
            }}
          />
        </div>

        <PokemonGrid
          pokemon={filteredPokemon}
          onPokemonClick={(pokemon) => addToTeam(pokemon)}
          className="mt-4 md:mt-0"
        />
      </div>

      {modalIsOpen && (
        <PokemonModal
          pokemonUrl={pokemonUrl}
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
      )}

      {alertMessage && ( // If you try to add more then 6 pokemons
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {alertMessage}
        </div>
      )}
    </div>
  );
}

