import { useState, useEffect } from "react";
import WordCell from "./components/Word Cell/WordCell";
import "./App.css";
import Switch from "./components/Switch/Switch"



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
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // custom word dictionary goes here ... 
        }),        
    });
    const jsonData = await response.json();
    console.log(jsonData);
    setCards(jsonData.words);
}

function App() {
    const [cells, setCells] = useState([]);
    const [isPlayerView, setIsPlayerView] = useState(false);

    useEffect(() => {
        getCards(setCells);
    }, []);

    async function handleCardClick(index, ) {
        const response = await fetch(`http://127.0.0.1:8001/api/guess?index=${index}`)
        const jsonData = await response.json();
        console.log(jsonData);
        if (jsonData === "blue has won! play again?" || jsonData === "blue has won! play again?") {
            setCells([]);
        }
        else {
            setCells(jsonData.words);
        }
    }
    
    return (
        <div className="App">
            <Switch isPlayerFunction={setIsPlayerView} isPlayer={isPlayerView}/>
            {cells.map((cell, index) => (
                <WordCell cell={cell} key={`${cell.word}-${index}`} isPlayer={isPlayerView} handleCardClick={handleCardClick}/> 
            ))}
            
        </div>
    );
}

export default App;
