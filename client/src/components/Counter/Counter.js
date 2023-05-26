import "./Counter.css";

function Counter({ wordGuess, guessAmount }) {
    return (
        <div className="counter">
            <div className="word">{wordGuess}: </div>
            <div>{guessAmount}</div>
        </div>
    );
}

export default Counter;
