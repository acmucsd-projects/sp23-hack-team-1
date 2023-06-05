import { useState, useEffect } from "react";
import WordCell from "../../components/Word Cell/WordCell";
import Counter from "../../components/Counter/Counter";
import SpyInput from "../../components/SpyInput/SpyInput";
import MessageBox from "../../components/MessageBox/MessageBox";
import WinScreen from "../../components/WinScreen/WinScreen";
import { socket } from "../../socket";
import "./Game.css";

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
async function getCards(gameState, customWords) {
    let response;
    if (gameState === "new-userinput") {
        response = await fetch(
            "https://codenames-acm.herokuapp.com/api/newboard",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // custom word dictionary goes here ...
                    customizedDict: customWords,
                }),
            }
        );
    } else if (gameState === "new-random") {
        await fetch("https://codenames-acm.herokuapp.com/api/clearDictionary");
        response = await fetch(
            "https://codenames-acm.herokuapp.com/api/newboard",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
    } else {
        response = await fetch("https://codenames-acm.herokuapp.com/");
    }
    await response.json();
    socket.emit("update");
}

function Game({ gameState, customWords, role }) {
    const [cells, setCells] = useState([]);
    const [playerGuess, setPlayerGuess] = useState(0);

    const [currentWordGuess, setCurrentWordGuess] = useState();

    const [turn, setTurn] = useState(Turns.RedSpy);

    const [winner, setWinner] = useState("");

    useEffect(() => {
        getCards(gameState, customWords);
        socket.on("updateBoard", (message) => {
            if (message != null) {
                setPlayerGuess(message.playerGuess);
                setCurrentWordGuess(message.currentWordGuess);
                setTurn(message.turn);
                setCells(message.words);
                setWinner(message.winner);
            }
            console.log(message);
        });
    }, []);

    async function handleCardClick(index) {
        if (playerGuess > 0) {
            await fetch(
                `https://codenames-acm.herokuapp.com/api/guess?index=${index}`
            );
            socket.emit("update");
        }
    }

    async function handleSpyInput(word, amount) {
        await fetch(
            `https://codenames-acm.herokuapp.com/api/selectword?currentWordGuess=${word}&playerGuess=${amount}`
        );
        socket.emit("update");
    }

    return (
        <div className="Game">
            {winner !== "" && winner !== null && <WinScreen winner={winner} />}
            <MessageBox playerTurn={turn} />
            {(turn === Turns.RedGuess || turn === Turns.BlueGuess) && (
                <Counter
                    wordGuess={currentWordGuess}
                    guessAmount={playerGuess}
                />
            )}
            {(turn === Turns.BlueSpy && role === "Blue Spy") ||
                (turn === Turns.RedSpy && role === "Red Spy" && (
                    <SpyInput handleSpyInput={handleSpyInput} />
                ))}
            <div className="cell-grid">
                {cells.map((cell, index) => (
                    <WordCell
                        cell={cell}
                        key={`${cell.word}-${index}`}
                        turn={turn}
                        handleCardClick={handleCardClick}
                        role={role}
                        winner={winner}
                    />
                ))}
            </div>
        </div>
    );
}

export { Turns };
export default Game;
