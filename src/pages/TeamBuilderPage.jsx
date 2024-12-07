import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonSearch from "../components/PokemonSearch";
import PokemonGrid from "../components/PokemonGrid";
import TeamPokemon from "../components/TeamPokemon";
import TeamList from "../components/TeamList";
import PokemonModal from "../components/PokemonModal";

export default function TeamBuilderPage() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(1);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pokemonUrl, setPokemonUrl] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedTeams = JSON.parse(localStorage.getItem("teams"));
    if (storedTeams && storedTeams.length === 6) {
      setTeams(storedTeams);
    } else {
      initializeTeams();
    }

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

  const handlePokemonClick = (pokemon) => {
    setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`);
    setModalIsOpen(true);
  };

  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery);
  };

  const addToTeam = async (newPokemon) => {
    if (selectedTeam === 0) return;

    const updatedTeams = teams.map((team) => {
      if (team.id === selectedTeam && team.pokemon.length < 6) {
        return {
          ...team,
          pokemon: [...team.pokemon, newPokemon],
        };
      }
      return team;
    });
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  const removeFromTeam = async (pokemonIndex) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === selectedTeam) {
        return {
          ...team,
          pokemon: team.pokemon.filter((_, index) => index !== pokemonIndex),
        };
      }
      return team;
    });
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  const updateTeamName = async (teamId, newName) => {
    const updatedTeams = teams.map((team) =>
      team.id === teamId ? { ...team, name: newName } : team
    );
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  const initializeTeams = () => {
    const defaultTeams = [
      { id: 1, name: "Team 1", pokemon: [] },
      { id: 2, name: "Team 2", pokemon: [] },
      { id: 3, name: "Team 3", pokemon: [] },
      { id: 4, name: "Team 4", pokemon: [] },
      { id: 5, name: "Team 5", pokemon: [] },
      { id: 6, name: "Team 6", pokemon: [] },
    ];
    setTeams(defaultTeams);
    localStorage.setItem("teams", JSON.stringify(defaultTeams));
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
    <div className="flex gap-8 p-8 font-mono bg-[#f8f0f0] min-h-screen">
      <TeamList
        teams={teams}
        selectedTeam={selectedTeam}
        onSelectTeam={setSelectedTeam}
        onUpdateTeamName={updateTeamName}
      />

      <div className="flex-1 space-y-6">
        <PokemonSearch searchTerm={searchTerm} onSearchChange={handleSearch} />
        <TeamPokemon
          team={teams[selectedTeam - 1]}
          onRemovePokemon={removeFromTeam}
          onPokemonClick={handlePokemonClick}
        />

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
