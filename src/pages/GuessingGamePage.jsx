import React, { useState, useEffect } from "react";
import axios from "axios";

import "./GuessingGamePage.scss"

function GuessingGamePage() {
    const totalPokemon = 967;
    const totalOptions = 5;
    const timeToGuess = 60;
    const maxFailedAttempts = totalOptions - 2;
    const [gameStatus, setGameStatus] = useState("initial")
    const [pokemonList, setPokemonList] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [failedAttempts, setFailedAttempts] = useState(0)
    const [timeLeft, setTimeLeft] = useState(0);
    const [message, setMessage] = useState("");

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
            setFailedAttempts(0);
            setMessage("Click Start to Play");
            setTimeLeft(timeToGuess);
        };

        if(gameStatus === "initial") initializeGame();
    }, [gameStatus])

    useEffect(() => {
        if(gameStatus === "active") {
            let timer = setInterval(() => {
            setTimeLeft((prev) => {
              if (prev === 0) {
                setMessage("Time's up! You lost.");
                setGameStatus("finished");
                clearInterval(timer);
                return 0;
              } else return prev - 1;
            });
          }, 1000);
          return () => clearInterval(timer);
        }
    }, [gameStatus])

    const pickOption = (event, name) => {
        if (gameStatus !== "active") return;
        
        if (name === correctAnswer.name) {
            event.target.className = "option_button correct";
            setMessage("You won!");
            setGameStatus("finished");
        } else {
            event.target.className = "option_button incorrect";
            setFailedAttempts((prev) => {
                const newAttempts = prev + 1;
                if (newAttempts >= maxFailedAttempts) {
                    setMessage("You lost! Too many wrong attempts.");
                    setGameStatus("finished");
                }
                return newAttempts;
            });
        }
        event.target.disabled = true;
    };

    const startGame = () => {
        setGameStatus("active");
    };

    const playAgain = () => {
        setGameStatus("initial");
    };

    const processImage = () => {
        if(gameStatus === "initial") return {filter: `contrast(0)`};
        else if(gameStatus === "active") return {filter: `blur(${(6 * timeLeft)/timeToGuess}px)`};
    }

    const capitalizeWord = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if(pokemonList.length === 0) return <div className="page"><h2 className="loading">Loading...</h2></div>;

    return (
        <div className="page">
            <div className="half_page">
                <div className="card">
                    <h2>{gameStatus === "finished" ? capitalizeWord(correctAnswer.name) : "Who's that pokemon?"}</h2>
                    <img src={correctAnswer.sprites.other['official-artwork'].front_default} style={processImage()}></img>
                </div>
                <div className="timer">
                    <button onClick={gameStatus === "initial" ? startGame : playAgain} disabled={gameStatus === "active"}>{gameStatus === "initial" ? "Start" : "Play Again"}</button>
                    <h2>{String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}</h2>
                </div>
            </div>
            <div className="half_page">
                <div className="game_info">
                    <h2 id="game_message">{message}</h2>
                    <h2 id="game_message">Lives: {maxFailedAttempts-failedAttempts}</h2>
                </div>
                {gameStatus === "initial" ? "" :
                <div className="answer_options">
                    {pokemonList.map((option) => (
                        <button className="option_button" key={option.name} onClick={(e)=>pickOption(e, option.name)} disabled={gameStatus !== "active"}>{capitalizeWord(option.name)}</button>
                    ))}
                </div>}
            </div>
        </div>
    );
}

export default GuessingGamePage;