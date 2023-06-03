import { useState } from "react";
import Game from "./pages/Game/Game";
import StartMenu from "./pages/StartMenu/StartMenu";

function App() {
    const [gameState, setGameState] = useState("");
    const [customWords, setCustomWords] = useState([]);
    const [role, setRole] = useState("Red Guess");

    if (gameState !== "") {
        return (
            <Game gameState={gameState} customWords={customWords} role={role} />
        );
    } else {
        return (
            <StartMenu
                setRole={setRole}
                setGameState={setGameState}
                setCustomWords={setCustomWords}
            />
        );
    }
}

export default App;
