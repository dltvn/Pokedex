import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import PokemonSearch from "../components/PokemonSearch";
import PokemonGrid from "../components/PokemonGrid";
import TeamPokemon from "../components/TeamPokemon";
import TeamList from "../components/TeamList";
import PokemonModal from "../components/PokemonModal";
import Dropdown from "../components/Dropdown";

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

  useEffect(() => {
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

    const initializeData = async () => {
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

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter(({ pokemon }) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, pokemonList]);

  const updateTeams = (updatedTeams) => {
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  const addToTeam = (newPokemon) => {
    setTeams((prevTeams) => {
      const updatedTeams = prevTeams.map((team) =>
        team.id === selectedTeam && team.pokemon.length < 6
          ? { ...team, pokemon: [...team.pokemon, newPokemon] }
          : team
      );
      localStorage.setItem("teams", JSON.stringify(updatedTeams));
      return updatedTeams;
    });
  };

  const removeFromTeam = (pokemonIndex) => {
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

  const updateTeamName = (teamId, newName) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, name: newName } : team
      )
    );
  };

  if (loading || error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {error ? <p>{error}</p> : <p>Loading...</p>}
      </div>
    );
  }

  return (
    <div className="bg-[#f8f0f0] min-h-screen flex flex-col md:flex-row gap-4 md:p-4">

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
        <div className="hidden md:block">
          <PokemonSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        <div className="relative z-0 p-8">
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