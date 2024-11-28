"use client"

import { useState, useEffect } from "react"
import PokemonSearch from "../components/PokemonSearch";
import PokemonGrid from "../components/PokemonGrid";
import TeamPokemon from "../components/TeamPokemon";
import TeamList from "../components/TeamList";

export default function TeamBuilderPage() {
  const [teams, setTeams] = useState([
    { id: 1, name: "Team #1", pokemon: [] },
  ])
  const [selectedTeam, setSelectedTeam] = useState(1)
  const [pokemon, setPokemon] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        const data = await response.json()
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            const details = await res.json()
            return {
              id: details.id,
              name: details.name.charAt(0).toUpperCase() + details.name.slice(1),
              sprite: details.sprites.front_default,
              type: details.types[0].type.name
            }
          })
        )
        
        setPokemon(pokemonDetails)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Pokemon:', error)
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  const addTeam = () => {
    const newTeamId = teams.length + 1
    setTeams([...teams, { id: newTeamId, name: `Team #${newTeamId}`, pokemon: [] }])
  }

  const addToTeam = (newPokemon) => {
    if (selectedTeam === 0) return
    setTeams(teams.map(team => {
      if (team.id === selectedTeam && team.pokemon.length < 6) {
        return {
          ...team,
          pokemon: [...team.pokemon, newPokemon]
        }
      }
      return team
    }))
  }

  const removeFromTeam = (pokemonIndex) => {
    setTeams(teams.map(team => {
      if (team.id === selectedTeam) {
        return {
          ...team,
          pokemon: team.pokemon.filter((_, index) => index !== pokemonIndex)
        }
      }
      return team
    }))
  }

  const updateTeamName = (teamId, newName) => {
    setTeams(teams.map(team => 
      team.id === teamId ? { ...team, name: newName } : team
    ))
  }

  const filteredPokemon = pokemon.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
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
        <PokemonSearch 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <TeamPokemon 
          team={teams[selectedTeam - 1]}
          onRemovePokemon={removeFromTeam}
        />

        <PokemonGrid 
          pokemon={filteredPokemon}
          onPokemonClick={addToTeam}
        />
      </div>
    </div>
  )
}