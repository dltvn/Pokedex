import React, { useState, useEffect } from "react";
import axios from "axios";

import "./GuessingGamePage.css"

function GuessingGamePage() {
    const totalPokemon = 967;
    const totalOptions = 5;
    const timeToGuess = 60;
    const [gameWon, setGameWon] = useState(false);
    const [pokemonList, setPokemonList] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [failedAttempts, setFailedAttempts] = useState(0)
    const [timeLeft, setTimeLeft] = useState(timeToGuess);

    const randomInt = (min, max) => {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

    const fetchPokemon = async(id) => {
        try {
            const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return data;
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    }

    useEffect(() => {
        const initializeGame = async () => {
            const newPokemonList = [];
            for (let i = 0; i < totalOptions; i++) {
                const pokemon = await fetchPokemon(randomInt(1, totalPokemon));
                newPokemonList.push(pokemon);
            }

            setPokemonList(newPokemonList);
            setCorrectAnswer(newPokemonList[randomInt(0, newPokemonList.length - 1)]);
        };

        initializeGame();
    }, [])

    useEffect(() => {
        let timer = setInterval(() => {
          setTimeLeft((timeLeft) => {
            if (timeLeft === 0) {
              clearInterval(timer);
              return 0;
            } else return timeLeft - 1;
          });
        }, 1000);
      }, []);

    const processImage = () => {
        if(gameWon === true) return {filter: "blur(0)"};
        else return {filter: `blur(${(10 * timeLeft)/timeToGuess}px)`};
    }

    const capitalizeWord = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if(pokemonList.length === 0) return <div className="page"><h2 className="loading">Loading...</h2></div>;

    return (
        <div className="page">
            <div className="half_page">
                <div className="card">
                    <h2>Who's that pokemon?</h2>
                    <img src={correctAnswer.sprites.front_default} style={processImage()}></img>
                </div>
                <div className="timer">
                    <button>Start</button>
                    <h2>{Math.floor(timeLeft / 60)}:{timeLeft % 60}</h2>
                </div>
            </div>
            <div className="half_page">
                <div className="answer_options">
                    {pokemonList.map((option) => (
                        <button className="option_button" key={option.name}>{capitalizeWord(option.name)}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GuessingGamePage;