import "./SpyInput.css";

function SpyInput({ setGuessesLeft, setCurrentWordGuess, changeTurn }) {
    return (
        <div className="spy">
            <div>Word:</div>
            <input
                className="spy-word"
                type="text"
                onChange={(e) => setCurrentWordGuess(e.target.value)}
            />
            <div>Amount:</div>
            <input
                className="spy-amount"
                type="number"
                onChange={(e) => setGuessesLeft(e.target.value)}
            />
            <button
                type="button"
                className="submit-button"
                onClick={() => changeTurn()}>
                Submit
            </button>
        </div>
    );
}

export default SpyInput;
