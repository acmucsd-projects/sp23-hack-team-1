import "./WordCell.css";
import { Turns } from "../../pages/Game/Game";

function WordCell({ cell, turn, handleCardClick, role }) {
    const colorDict = new Map([
        ["red", "#ff948c"],
        ["blue", "#68b5e8"],
        ["white", "#faf0e6"],
        ["black", "#949494"],
    ]);

    if (turn === Turns.RedGuess || turn === Turns.BlueGuess) {
        if (cell.status === "unclick") {
            return (
                <div
                    className="cell"
                    onClick={() => handleCardClick(cell.index)}>
                    <p>{cell.word}</p>
                </div>
            );
        } else {
            return (
                <div
                    className="cell"
                    style={{ backgroundColor: colorDict.get(cell.type) }}>
                    <p>{cell.word}</p>
                </div>
            );
        }
    } else if (role === "Red Guesser" || role === "Blue Guesser") {
        if (cell.status === "unclick") {
            return (
                <div className="cell">
                    <p>{cell.word}</p>
                </div>
            );
        } else {
            return (
                <div
                    className="cell"
                    style={{ backgroundColor: colorDict.get(cell.type) }}>
                    <p>{cell.word}</p>
                </div>
            );
        }
    } else {
        return (
            <div
                className="cell"
                style={{ backgroundColor: colorDict.get(cell.type) }}>
                <p>{cell.word}</p>
            </div>
        );
    }
}
export default WordCell;
