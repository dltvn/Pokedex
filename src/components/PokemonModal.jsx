import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function PokemonModal({ isOpen, onClose, pokemonUrl }) {
  const [currentId, setCurrentId] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && pokemonUrl) {
      const fetchInitialPokemonData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(pokemonUrl);
          setPokemonData(response.data);
          setCurrentId(response.data.id);
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
              <div className="flex-1 p-5 flex items-center justify-center">
                <div className="items-center border-2 border-gray15 w-full max-w-[300px] aspect-square">
                  <h2 className="bg-gray15 p-2 capitalize">{pokemonData.name}</h2>
                  <img
                    src={pokemonData.sprites.front_default}
                    alt={pokemonData.name}
                    className="my-4 w-full"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center w-full bg-gray15 p-1 border-y-2 border-black">
                <button onClick={handlePrevious}>
                  <FaChevronLeft className="w-6 h-6 text-gray-700 hover:text-black" />
                </button>
                <div className="w-1/12">
                  <img src="/images/ball-open.png" alt="pokeball" />
                </div>
                <button onClick={handleNext}>
                  <FaChevronRight className="w-6 h-6 text-gray-700 hover:text-black" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-stretch border-r-2 border-black">
              <div className="flex-1">
                <h3 className="bg-gray25 p-2 border-2 border-x-0 border-black">
                  Info
                </h3>
                <ul className="p-3 text-center">
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
                      className={`flex-1 border-black py-3 ${
                        type.type.name === "grass"
                          ? "bg-green-500"
                          : type.type.name === "poison"
                          ? "bg-purple-500"
                          : "bg-gray-500"
                      } ${i === 0 ? "border-r-2" : ""}`}
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