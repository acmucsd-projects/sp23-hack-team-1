import { useState, useEffect } from "react";
import Game from "../Game/Game";
import "./StartMenu.css";

function StartMenu() {
  const [wordBank, setWordBank] = useState("");
  const [userWords, setUserWords] = useState([]);


  const handleUserInput = (e) => {
    setWordBank(e.target.value);
    console.log(wordBank);
  };

  const handleUserInputButtonClick = () => {
    setWordBank(wordBank)
    setUserWords(wordBank.split(","))
    console.log(userWords); // Move the console.log() statement inside the click handler


  };


  return (
    <div className="StartMenu">
      <div className="inputContainer">
        <label htmlFor="userInput">Input your own:</label>
        <textarea 
        id="userInput" 
        onChange={handleUserInput}></textarea>
      </div>
      <button className="UserInputButon" onClick={handleUserInputButtonClick}>
        Input your own
      </button>
      <button className="Random">Random Words</button>
    </div>
  );
}

export default StartMenu;

