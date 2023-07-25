import { useState } from "react";
import "./StartMenu.css";
import ButtonDropdown from "../../components/ButtonDropdown/ButtonDropdown";

function StartMenu({
    setGameState,
    setCustomWords,
    setRole,
    roomcode,
    setRoomCode,
}) {
    const [wordBank, setWordBank] = useState("");
    const [wordBankError, setWordBankError] = useState(false);

    const [userSelection, setUserSelection] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [roomcodeError, setRoomCodeError] = useState(false);

    const handleRoomCodeInput = (e) => {
        setRoomCode(e.target.value);
    };

    const handleUserInput = (e) => {
        setWordBank(e.target.value);
    };

    const handleUserInputButtonClick = (userSelection) => {
        if (userSelection === "new-userinput") {
            const words = wordBank.split(",");
            if (words.length !== 25) {
                setWordBankError(true);
                return;
            }
            setWordBankError(false);
            setCustomWords(words);
            setUserSelection("new-userinput");
        } else if (userSelection === "new-random") {
            setUserSelection("new-random");
        } else {
            setUserSelection("existing");
        }
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (option) => {
        if (userSelection === "existing" && roomcode !== "") {
            setRole(option);
            setGameState(userSelection);
        } else if (userSelection === "existing") {
            setRoomCodeError(true);
        } else {
            setRole(option);
            setGameState(userSelection);
        }
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
                onClick={() => {
                    handleUserInputButtonClick("new-userinput");
                }}>
                Input your own
            </button>
            {userSelection === "new-userinput" && isDropdownOpen && (
                <ButtonDropdown handleOptionClick={handleOptionClick} />
            )}
            <button
                className="Random"
                onClick={() => {
                    handleUserInputButtonClick("new-random");
                }}>
                Random Words
            </button>
            {userSelection === "new-random" && isDropdownOpen && (
                <ButtonDropdown handleOptionClick={handleOptionClick} />
            )}
            <button
                className="existing"
                onClick={() => {
                    handleUserInputButtonClick("existing");
                }}>
                Join Existing
            </button>
            {userSelection === "existing" &&
                isDropdownOpen &&
                roomcodeError && (
                    <div className="wordlist-error">
                        Please enter a room code
                    </div>
                )}
            {userSelection === "existing" && isDropdownOpen && (
                <div className="roomcode-container">
                    <label htmlFor="roomcodeInput">Room Code:</label>
                    <input
                        id="roomcodeInput"
                        onChange={handleRoomCodeInput}></input>
                </div>
            )}
            {userSelection === "existing" && isDropdownOpen && (
                <ButtonDropdown handleOptionClick={handleOptionClick} />
            )}
        </div>
    );
}

export default StartMenu;
