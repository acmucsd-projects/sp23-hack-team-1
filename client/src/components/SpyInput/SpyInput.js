import { useState } from "react";
import "./SpyInput.css";

function SpyInput({ handleSpyInput }) {
    const [currentWord, setCurrentWord] = useState("");
    const [guessAmount, setGuessAmount] = useState(0);

    return (
        <div className="spy">
            <div>Word:</div>
            <input
                className="spy-word"
                type="text"
                onChange={(e) => setCurrentWord(e.target.value)}
                value={currentWord}
            />
            <div>Amount:</div>
            <input
                className="spy-amount"
                type="number"
                onChange={(e) => setGuessAmount(e.target.value)}
                value={guessAmount}
            />
            <button
                type="button"
                className="submit-button"
                onClick={() => handleSpyInput(currentWord, guessAmount)}>
                Submit
            </button>
        </div>
    );
}

export default SpyInput;
