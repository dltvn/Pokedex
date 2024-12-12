import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

import "./GuessingGamePage.scss"

function GuessingGamePage() {
    const totalPokemon = 967;
    const totalOptions = 5;
    const timeToGuess = 10;
    const maxFailedAttempts = totalOptions - 2;
    const [gameStatus, setGameStatus] = useState("initial")
    const [pokemonList, setPokemonList] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [failedAttempts, setFailedAttempts] = useState(0)
    const [timeLeft, setTimeLeft] = useState(0);
    const [message, setMessage] = useState("");
    const [streak, setStreak] = useState(0);

    //get random int between min and max
    const randomInt = (min, max) => {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

    //fetch pokemon data by id
    const fetchPokemon = async(id) => {
        try {
            const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return data;
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    }

    // fetch answer options, set the pokemon list of options, set correct answer, reset failed attempts, reset message, reset time left. Run on initial game status.
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

    //start the timer on active game state, if the timer ends, set game to finished and message to loosing message.
    useEffect(() => {
        if(gameStatus === "active") {
            let timer = setInterval(() => {
            setTimeLeft((prev) => {
              if (prev === 0) {
                const audio = new Audio('/sounds/wrong-option.mp3');
                audio.play();//play incorrect option sound
                setMessage("Time's Up! You Lost.");
                //reset streak
                setStreak(0);
                setGameStatus("finished");
                clearInterval(timer);
                return 0;
              } else return prev - 1;
            });
          }, 1000);
          return () => clearInterval(timer);
        }
    }, [gameStatus])

    //handles clicking on an option
    const pickOption = (event, name) => {
        //only if the game is active
        if (gameStatus !== "active") return;
        //if correct answer
        if (name === correctAnswer.name) {
            const audio = new Audio('/sounds/correct-option.mp3');
            audio.play();//play winning sound
            event.target.className = "option_button correct";//set class for styling
            setMessage("You Won!");
            //increment streak
            setStreak((prev) => {
                return prev + 1;
            })
            setGameStatus("finished");//game status to finished
        } else {
            const audio = new Audio('/sounds/wrong-option.mp3');
            audio.play();//play incorrect option sound
            event.target.className = "option_button incorrect";//set class for styling
            setMessage("Wrong... Try Again!")
            //increment wrong attempts
            setFailedAttempts((prev) => {
                const newAttempts = prev + 1;
                //if too many wrong attempts (game lost)
                if (newAttempts >= maxFailedAttempts) {
                    setMessage("You Lost! Too Many Wrong Attempts.");
                    //reset streak
                    setStreak(0);
                    setGameStatus("finished");//game status to finished
                }
                return newAttempts;
            });
        }
        event.target.disabled = true;//disable the option button after it's clicked
    };

    //handles start game button
    const startGame = () => {
        const audio = new Audio('/sounds/whos-that-pokemon.mp3');
        audio.play();//plays the sound
        setGameStatus("active");//game status to active, will trigger initializeGame
        setMessage("Select an Option!");
    };

    //handles play again, resets the game to initial state to start over
    const playAgain = () => {
        setGameStatus("initial");
    };

    //grays out the image is the game hasn't started, else deblurs it as the timer passes
    const processImage = () => {
        if(gameStatus === "initial") return {filter: `contrast(0)`};
        else if(gameStatus === "active") return {filter: `blur(${(20 * timeLeft)/timeToGuess}px)`};
    }

    //capitalizes a word (could be done with css but whatever)
    const capitalizeWord = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const returnHeartsList = () => {
        const hearts = [];
        for(let i = 0; i < maxFailedAttempts-failedAttempts; i++) hearts.push(<FaHeart/>);
        return hearts;
    }

    //returns a tailwind class to background gradient based on pokemon's type
    const returnPokemonTypesGradient = () => {
        return (correctAnswer.types.length === 1
            ? `bg-poke_${correctAnswer.types[0].type.name}`
            : "bg-gradient-to-r " +
            correctAnswer.types
            .map(({ type: { name } }, i) => {
                if (i === 0) return `from-poke_${name}`;
                if (i === correctAnswer.types.length - 1)
                return `to-poke_${name}`;
                return `via-poke_${name}`;
            })
            .join(" "));
    }

    //loading screen while the pokemons are being fetched
    if(pokemonList.length === 0) return <div className="page"><h2 className="loading">Loading...</h2></div>;

    return (
        <div className="page">
            <div className="half_page">
                <div className="card">
                    {/* doesn't display name and gradient until finished */}
                    <h2 className={gameStatus === "finished" ? returnPokemonTypesGradient() : ""}>{(gameStatus === "finished" ? capitalizeWord(correctAnswer.name) : "Who's that pokemon?")}</h2>
                    <img src={correctAnswer.sprites.other['official-artwork'].front_default} style={processImage()}></img>
                </div>
                <div className="timer">
                    {/* button changes based on game state */}
                    <button onClick={gameStatus === "initial" ? startGame : playAgain} disabled={gameStatus === "active"}>{gameStatus === "initial" ? "Start" : "Play Again"}</button>
                    <h2>{String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}</h2>
                </div>
            </div>
            <div className="half_page">
                <div className="game_info">
                    <h2 id="game_message">{message}</h2>
                    <h2 id="game_streak">You guessed {streak} in a row!</h2>
                    <div className="hearts">
                        {returnHeartsList()}
                    </div>
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