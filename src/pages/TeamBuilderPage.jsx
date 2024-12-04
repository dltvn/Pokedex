import React, { useState, useEffect } from "react";  // Import React and hooks
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
  const [searchTerm, setSearchTerm] = useState(""); // Added state for search term

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

  const handlePokemonClick = async (id) => {
    try {
      setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    }
  };

  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery); // Update the search term
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
    <div className="flex gap-8 p-8 font-mono bg-[#f8f0f0] min-h-screen">
      <TeamList
        teams={teams}
        selectedTeam={selectedTeam}
        onSelectTeam={setSelectedTeam}
        onUpdateTeamName={updateTeamName}
      />

      <div className="flex-1 space-y-6">
        <PokemonSearch searchTerm={searchTerm} onSearchChange={handleSearch} />
        <TeamPokemon team={teams[selectedTeam - 1]} onRemovePokemon={removeFromTeam} />

        <PokemonGrid pokemon={filteredPokemon} onPokemonClick={addToTeam} />
      </div>
    </div>
  );
}
