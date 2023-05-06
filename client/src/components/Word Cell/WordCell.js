import "./WordCell.css";

function WordCell({ cell }) {
    const colorDict = new Map([
        ["red", "#ff948c"],
        ["blue", "#68b5e8"],
        ["white", "#faf0e6"],
        ["black", "#949494"],
    ]);

    return (
        <div
            className="cell"
            style={{ backgroundColor: colorDict.get(cell.type) }}>
            <p>{cell.word}</p>
        </div>
    );
}

export default WordCell;
