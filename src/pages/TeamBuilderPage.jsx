"use client";

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
  ]);
  const [selectedTeam, setSelectedTeam] = useState(1);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pokemonUrl, setPokemonUrl] = useState();

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

  const handlePokemonClick = async (id) => {
    try {
      setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    }
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filtered = pokemonList.filter(({ pokemon }) =>
      pokemon.name.toLowerCase().includes(searchQuery)
    );
    setFilteredPokemon(filtered);
  };

  const addTeam = () => {
    const newTeamId = teams.length + 1;
    setTeams([...teams, { id: newTeamId, name: `Team #${newTeamId}`, pokemon: [] }]);
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
        onAddTeam={addTeam}
      />

      <div className="flex-1 space-y-6">
        <PokemonSearch onSearchChange={handleSearch} />
        <TeamPokemon team={teams[selectedTeam - 1]} onRemovePokemon={removeFromTeam} />

        <PokemonGrid pokemon={filteredPokemon} onPokemonClick={addToTeam} />
      </div>

      <PokemonModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onCatch={() => fetchPokemonList()}
        pokemonUrl={pokemonUrl}
      />
    </div>
  );
}
