import { useState, useEffect } from "react";

import WordCell from "./components/Word Cell/WordCell";

import "./App.css";

/**
 * Acquires a board of cards via the api.
 * @param {import("react").SetStateAction} setCards
 * setCards: a function of which to set the state of with the cards obtained from the api.
 * @returns {void}
 */
async function getCards(setCards) {
    const response = await fetch("http://127.0.0.1:8001/api/newboard");
    const jsonData = await response.json();
    console.log(jsonData);
    setCards(jsonData.words.map((wordObj) => wordObj.word));
}

function App() {
    const [cells, setCells] = useState([
        "test1",
        "test2",
        "test3",
        "test4",
        "test5",
        "test6",
        "test7",
        "test8",
        "test9",
    ]);

    useEffect(() => {
        getCards(setCells);
    }, []);

    return (
        <div className="App">
            {cells.map((cell, index) => (
                <WordCell word={cell} key={`${cell}-${index}`} />
            ))}
        </div>
    );
}

export default App;
