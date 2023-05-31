import { useState } from "react";
import Game from "./pages/Game/Game";
import StartMenu from "./pages/StartMenu/StartMenu";

function App() {
    const [gameState, setGameState] = useState("");
    const [customWords, setCustomWords] = useState([]);

    if (gameState !== "") {
        return <Game gameState={gameState} customWords={customWords} />;
    } else {
        return (
            <StartMenu
                setGameState={setGameState}
                setCustomWords={setCustomWords}
            />
        );
    }
}

export default App;
