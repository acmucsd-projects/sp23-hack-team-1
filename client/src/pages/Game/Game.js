import { useState, useEffect } from "react";
import WordCell from "../../components/Word Cell/WordCell";
import "./Game.css";
import Switch from "../../components/Switch/Switch";
import Counter from "../../components/Counter/Counter";
import SpyInput from "../../components/SpyInput/SpyInput";

const Turns = {
    RedSpy: "redspy",
    BlueSpy: "bluespy",
    RedGuess: "redguess",
    BlueGuess: "blueguess",
};

/**
 * Acquires a board of cards via the api.
 * @param {import("react").SetStateAction} setCards
 * setCards: a function of which to set the state of with the cards obtained from the api.
 * @returns {void}
 */
async function getCards(setCards) {
    const response = await fetch("http://127.0.0.1:8001/api/newboard", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // custom word dictionary goes here ...
        }),
    });
    const jsonData = await response.json();
    console.log(jsonData);
    setCards(jsonData.words);
}

function Game() {
    const [cells, setCells] = useState([]);
    const [isPlayerView, setIsPlayerView] = useState(false);
    const [playerGuess, setPlayerGuess] = useState(0);

    const [guessesLeft, setGuessesLeft] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");

    const [turn, setTurn] = useState(Turns.RedGuess);

    useEffect(() => {
        getCards(setCells);
    }, []);

    async function handleCardClick(index) {
        if (playerGuess === 0) {
            return;
        } //doesn't change color because no more guesses
        const response = await fetch(
            `http://127.0.0.1:8001/api/guess?index=${index}`
        );
        const jsonData = await response.json();
        console.log(jsonData);
        if (
            jsonData === "blue has won! play again?" ||
            jsonData === "red has won! play again?"
        ) {
            setCells([]);
        } else {
            setPlayerGuess((playerGuess) => playerGuess - 1);
            setCells(jsonData.words);
            console.log(playerGuess);
        }
    }

    return (
        <div className="Game">
            <Switch
                isPlayerFunction={setIsPlayerView}
                isPlayer={isPlayerView}
            />
            <Counter guessAmount={playerGuess} />
            {(turn === Turns.BlueSpy || turn === Turns.RedSpy) && (
                <SpyInput
                    setGuessesLeft={setGuessesLeft}
                    setCurrentGuess={setCurrentGuess}
                />
            )}
            {cells.map((cell, index) => (
                <WordCell
                    cell={cell}
                    key={`${cell.word}-${index}`}
                    isPlayer={isPlayerView}
                    handleCardClick={handleCardClick}
                />
            ))}
        </div>
    );
}

export { Turns };
export default Game;
