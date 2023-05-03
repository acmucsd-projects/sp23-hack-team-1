import "./WordCell.css";

function WordCell({ word }) {
    return (
        <div className="cell-wrapper">
            <div className="cell">
                <p>{word}</p>
            </div>
        </div>
    );
}

export default WordCell;
