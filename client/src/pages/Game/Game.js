import { useState, useEffect } from "react";
import WordCell from "../../components/Word Cell/WordCell";
import Counter from "../../components/Counter/Counter";
import SpyInput from "../../components/SpyInput/SpyInput";
import MessageBox from "../../components/MessageBox/MessageBox";
import RoomCode from "../../components/RoomCode/RoomCode";
import WinScreen from "../../components/WinScreen/WinScreen";
import { socket } from "../../socket";
import "./Game.css";
import Role from "../../components/Role/Role";

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
async function getCards(gameState, customWords, setRoomCode) {
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
        // this was used to clear the player dictionary since we only had one variable
        // storing a player's dictionary.... now defunct?
        // await fetch("https://codenames-acm.herokuapp.com/api/clearDictionary");
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
    const roomcode = await response.json();
    console.log(`room code: ${roomcode}`);
    setRoomCode(roomcode);
    socket.emit("joinRoom", roomcode);
    socket.emit("update", roomcode);
}

function Game({ gameState, customWords, role }) {
    const [cells, setCells] = useState([]);
    const [playerGuess, setPlayerGuess] = useState(0);

    const [currentWordGuess, setCurrentWordGuess] = useState();

    const [turn, setTurn] = useState(Turns.RedSpy);

    const [winner, setWinner] = useState("");

    const [roomcode, setRoomCode] = useState("");

    useEffect(() => {
        getCards(gameState, customWords, setRoomCode);
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
                `https://codenames-acm.herokuapp.com/api/guess?index=${index}&code=${roomcode}`
            );
            socket.emit("update", roomcode);
        }
    }

    async function handleSpyInput(word, amount) {
        await fetch(
            `https://codenames-acm.herokuapp.com/api/selectword?currentWordGuess=${word}&code=${roomcode}&playerGuess=${amount}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            }
        );
        socket.emit("update", roomcode);
    }

    return (
        <div className="Game">
            {winner !== "" && winner !== null && <WinScreen winner={winner} />}
            <MessageBox playerTurn={turn} role={role} />
            <RoomCode roomcode={roomcode} />
            {(turn === Turns.RedGuess || turn === Turns.BlueGuess) &&
                role === turn && (
                    <Counter
                        wordGuess={currentWordGuess}
                        guessAmount={playerGuess}
                    />
                )}
            {((turn === Turns.BlueSpy && role === "Blue Spy") ||
                (turn === Turns.RedSpy && role === "Red Spy")) && (
                <SpyInput handleSpyInput={handleSpyInput} />
            )}
            {role !== turn && <Role role={role} />}
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
