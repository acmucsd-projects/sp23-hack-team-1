import { useState } from "react";
import "./StartMenu.css";

function StartMenu() {
    const [wordBank, setWordBank] = useState("");
    const [userWords, setUserWords] = useState([]);

    const handleUserInput = (e) => {
        setWordBank(e.target.value);
    };

    const handleUserInputButtonClick = () => {
        setUserWords(wordBank.split(","));
        console.log(userWords);
    };

    return (
        <div className="StartMenu">
            <img src="./spy.png" alt="a spy" width={200} />
            <div className="title">Code Names - ACM</div>
            <div className="inputContainer">
                <label htmlFor="userInput">Input your own words:</label>
                <textarea id="userInput" onChange={handleUserInput}></textarea>
            </div>
            <button
                className="UserInputButon"
                onClick={handleUserInputButtonClick}>
                Input your own
            </button>
            <button className="Random">Random Words</button>
        </div>
    );
}

export default StartMenu;
