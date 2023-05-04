import "./WordCell.css";

function WordCell({ word }) {
    return (
        <div className="cell">
            <p>{word}</p>
        </div>
    );
}

export default WordCell;
