import { useState } from "react";
import "./StartMenu.css";

function StartMenu({ setGameState, setCustomWords }) {
    const [wordBank, setWordBank] = useState("");
    const [wordBankError, setWordBankError] = useState(false);

    const handleUserInput = (e) => {
        setWordBank(e.target.value);
    };

    const handleUserInputButtonClick = () => {
        const words = wordBank.split(",");
        if (words.length !== 25) {
            setWordBankError(true);
            return;
        }
        setWordBankError(false);
        setCustomWords(words);
        setGameState("new-userinput");
    };

    const handleRandomClick = () => {
        setGameState("new-random");
    };

    const handleExistingClick = () => {
        setGameState("existing");
    };

    return (
        <div className="StartMenu">
            <img src="./spy.png" alt="a spy" width={200} />
            <div className="title">Code Names - ACM</div>
            <div className="inputContainer">
                <label htmlFor="userInput">Input your own words:</label>
                <textarea id="userInput" onChange={handleUserInput}></textarea>
            </div>
            {wordBankError && (
                <div className="wordlist-error">
                    Please input 25 words separated by commas
                </div>
            )}
            <button
                className="UserInputButton"
                onClick={handleUserInputButtonClick}>
                Input your own
            </button>
            <button className="Random" onClick={handleRandomClick}>
                Random Words
            </button>
            <button className="existing" onClick={handleExistingClick}>
                Join Existing
            </button>
        </div>
    );
}

export default StartMenu;
