import "./SpyInput.css";

function SpyInput({ setGuessesLeft, setCurrentGuess, changeTurn }) {
    return (
        <div className="spy">
            <div>Word:</div>
            <input
                className="spy-word"
                type="text"
                onChange={(e) => setCurrentGuess(e.target.value)}
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
                onSubmit={() => changeTurn()}>
                Submit
            </button>
        </div>
    );
}

export default SpyInput;
