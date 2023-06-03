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
async function getCards(setCards, gameState, customWords) {
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
    const jsonData = await response.json();
    setCards(jsonData.words);
}

function Game({ gameState, customWords }) {
    const [cells, setCells] = useState([]);
    const [playerGuess, setPlayerGuess] = useState(0);

    const [currentWordGuess, setCurrentWordGuess] = useState();

    const [turn, setTurn] = useState(Turns.RedSpy);

    const [winner, setWinner] = useState("");

    useEffect(() => {
        getCards(setCells, gameState, customWords);
        socket.on("updateBoard", (message) => {
            console.log(message);
            if (message != null) {
                setCells(message.words);
            }
        });
    }, []);

    async function handleCardClick(index) {
        if (playerGuess <= 0) {
            handleTurnEnd();
            return;
        } //doesn't change color because no more guesses
        const response = await fetch(
            `https://codenames-acm.herokuapp.com/api/guess?index=${index}`
        );
        const jsonData = await response.json();
        // console.log(jsonData);
        if (jsonData === "blue has won! play again?") {
            setWinner("blue");
            // await fetch(`https://codenames-acm.herokuapp.com/api/endgame`);
        } else if (jsonData === "red has won! play again?") {
            setWinner("red");
            // await fetch(`https://codenames-acm.herokuapp.com/api/endgame`);
        } else {
            setPlayerGuess((playerGuess) => playerGuess - 1);
            setCells(jsonData.words);
            if (playerGuess - 1 <= 0) {
                handleTurnEnd();
                return;
            }
        }
        socket.emit("update");
    }

    async function handleTurnEnd() {
        if (turn === Turns.BlueSpy) {
            setTurn(Turns.BlueGuess);
        } else if (turn === Turns.RedSpy) {
            setTurn(Turns.RedGuess);
        } else {
            // call api
            const response = await fetch(
                `https://codenames-acm.herokuapp.com/api/endturn`
            );
            const jsonData = await response.json();
            setCells(jsonData.words);
            if (turn === Turns.BlueGuess) {
                setTurn(Turns.RedSpy);
            } else {
                setTurn(Turns.BlueSpy);
            }
        }
        socket.emit("update");
    }

    return (
        <div className="Game">
            {winner !== "" && <WinScreen winner={winner} />}
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
