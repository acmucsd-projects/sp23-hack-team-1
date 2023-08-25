import { useState } from "react";
import Game from "./pages/Game/Game";
import StartMenu from "./pages/StartMenu/StartMenu";

function App() {
    const [gameState, setGameState] = useState("");
    const [customWords, setCustomWords] = useState([]);
    const [role, setRole] = useState("Red Guess");
    const [roomcode, setRoomCode] = useState("");

    if (gameState !== "") {
        return (
            <Game
                gameState={gameState}
                customWords={customWords}
                role={role}
                roomcode={roomcode}
                setRoomCode={setRoomCode}
            />
        );
    } else {
        return (
            <StartMenu
                setRole={setRole}
                setGameState={setGameState}
                setCustomWords={setCustomWords}
                setRoomCode={setRoomCode}
                roomcode={roomcode}
            />
        );
    }
}

export default App;
