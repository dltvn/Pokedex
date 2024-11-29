import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function PokemonModal({ isOpen, onClose, pokemonUrl }) {
  const [userPokemonIds, setUserpokemonIds] = useState([]);
  const [isCaught, setIsCaught] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  setIsCaught(userPokemonIds.includes(currentId));
  console.log(userPokemonIds,currentId)
}, [currentId, pokemonUrl, userPokemonIds]);

  useEffect(() => {
    if (isOpen && pokemonUrl) {
      const fetchInitialPokemonData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(pokemonUrl);
          setPokemonData(response.data);
          setCurrentId(response.data.id);
          const {data} = await axios.get("/api/pokemon/users/ids");
          setUserpokemonIds(data.pokemonIds);
        } catch (error) {
          console.error("Failed to fetch Pokémon data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchInitialPokemonData();
    }
  }, [isOpen, pokemonUrl]);

  useEffect(() => {
    if (currentId && currentId !== pokemonData?.id) {
      const fetchPokemonDataById = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${currentId}`
          );
          setPokemonData(response.data);
        } catch (error) {
          console.error("Failed to fetch Pokémon data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPokemonDataById();
    }
  }, [currentId]);

  const handleNext = () => {
    setCurrentId((prevId) => prevId + 1);
  };

  const handlePrevious = () => {
    setCurrentId((prevId) => Math.max(prevId - 1, 1));
  };

  const catchPokemon = async () => {
    const {cries, forms, moves,game_indices, ...pokemon} = pokemonData;
    const response = await axios.post("/api/pokemon", {
      pokemon
    });
    setUserpokemonIds(ids => [...ids, pokemon.id]);
    alert('You caught '+pokemonData.name);
    onCatch?.();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-poke_gray w-full mx-auto h-full"
    >
      <div className="flex flex-col h-full text-center sm:flex-row overflow-y-auto">
        {pokemonData && (
          <>
            <div className="border-r-2 border-black flex-1 flex flex-col">
              <div className="pt-2 text-left">
                <button onClick={onClose} className="pt-2 pl-2">
                  <FaTimes className="w-6 h-6 text-gray-700 hover:text-black" />
                </button>
              </div>
                <div className="flex-1 p-7 flex items-center justify-center">
                <div className="h-fit w-fit sflex flex-col border-2 border-gray15">
                  <h2 className="w-full bg-gray15 p-2 capitalize">
                    {pokemonData.name}
                  </h2>
                  <div className="h-full">
                  <img
                    src={pokemonData.sprites.other['official-artwork'].front_default}
                    alt={pokemonData.name}
                    className="f-full object-contain p-6"
                  />
                  </div>
                </div>
                </div>
              <div className="relative flex justify-between items-center w-full h-[50px] bg-gray15 p-1 sm:border-b-2 border-t-2 border-black">
                <button onClick={handlePrevious}>
                  <FaChevronLeft className="w-6 h-6 text-gray-700 hover:text-black" />
                </button>
                <div className="">
                  <button onClick={catchPokemon} className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                    <img
                      className="h-full object-contain"
                      src={isCaught ? '/images/ball-close.png' : '/images/ball-open.png'}
                      alt="pokeball"
                      width={53}
                    />
                  </button>
                </div>
                <button onClick={handleNext}>
                  <FaChevronRight className="w-6 h-6 text-gray-700 hover:text-black" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col border-r-2 border-black">
              <div className="flex-1">
                <h3 className="bg-gray25 p-2 border-2 border-x-0 border-black">
                  Info
                </h3>
                <ul className="p-3 text-center flex flex-col justify-center items-center ">
                  <li>Height: {pokemonData.height}</li>
                  <li>Weight: {pokemonData.weight}</li>
                  <li>Gender: Male/Female</li>
                  <li>Category: Seed</li>
                  <li>
                    Abilities:{" "}
                    {pokemonData.abilities
                      .map((ability) => ability.ability.name)
                      .join(", ")}
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <h3 className="bg-gray25 p-2 border-2 border-x-0 border-black">
                  Stats
                </h3>
                <ul className="p-3 text-center">
                  {pokemonData.stats.map((stat) => (
                    <li key={stat.stat.name}>
                      {stat.stat.name}: {stat.base_stat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="">
                <h3 className="bg-gray25 p-2 border-2 border-x-0 border-black">
                  Types
                </h3>
                <div className="flex">
                  {pokemonData.types.map((type, i) => (
                    <span
                      key={type.type.name}
                      className={`flex-1 border-black 
                      py-3 bg-poke_${type.type.name} 
                      ${i === 0 ? "border-r-2" : ""}`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default PokemonModal;
