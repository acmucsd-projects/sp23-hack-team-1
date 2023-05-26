import { useState, useEffect } from "react";
import WordCell from "../../components/Word Cell/WordCell";
import "./Game.css";
import Counter from "../../components/Counter/Counter";
import SpyInput from "../../components/SpyInput/SpyInput";
import MessageBox from "../../components/MessageBox/MessageBox";

const Turns = {
    RedSpy: "Red Spy",
    BlueSpy: "Blue Spy",
    RedGuess: "Red Guess",
    BlueGuess: "Blue Guess",
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
    const [playerGuess, setPlayerGuess] = useState(0);

    const [currentWordGuess, setCurrentWordGuess] = useState("test");

    const [turn, setTurn] = useState(Turns.RedGuess);

    useEffect(() => {
        getCards(setCells);
    }, []);

    async function handleCardClick(index) {
        if (playerGuess <= 0) {
            handleTurnEnd();
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
            if (playerGuess - 1 <= 0) {
                handleTurnEnd();
                return;
            }
        }
    }

    async function handleTurnEnd() {
        if (turn === Turns.BlueSpy) {
            setTurn(Turns.BlueGuess);
        } else if (turn === Turns.RedSpy) {
            setTurn(Turns.RedGuess);
        } else {
            // call api
            const response = await fetch(`http://127.0.0.1:8001/api/endturn`);
            const jsonData = await response.json();
            console.log(jsonData);
            setCells(jsonData.words);
            if (turn === Turns.BlueGuess) {
                setTurn(Turns.RedSpy);
            } else {
                setTurn(Turns.BlueSpy);
            }
        }
    }

    return (
        <div className="Game">
            <MessageBox playerTurn={turn} />
            {(turn === Turns.RedGuess || turn === Turns.BlueGuess) && (
                <Counter
                    wordGuess={currentWordGuess}
                    guessAmount={playerGuess}
                />
            )}
            {(turn === Turns.BlueSpy || turn === Turns.RedSpy) && (
                <SpyInput
                    setGuessesLeft={setPlayerGuess}
                    setCurrentWordGuess={setCurrentWordGuess}
                    changeTurn={handleTurnEnd}
                />
            )}
            <div className="cell-grid">
                {cells.map((cell, index) => (
                    <WordCell
                        cell={cell}
                        key={`${cell.word}-${index}`}
                        turn={turn}
                        handleCardClick={handleCardClick}
                    />
                ))}
            </div>
        </div>
    );
}

export { Turns };
export default Game;
