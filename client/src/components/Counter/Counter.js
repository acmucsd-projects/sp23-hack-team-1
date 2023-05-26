import "./Counter.css";

function Counter({ wordGuess, guessAmount }) {
    return (
        <div className="counter">
            <div className="word">
                "{wordGuess}" : {guessAmount}
            </div>
        </div>
    );
}

export default Counter;
