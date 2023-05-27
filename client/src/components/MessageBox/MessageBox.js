import "./MessageBox.css";

function MessageBox({ playerTurn }) {
    if (playerTurn[0] === "R")
        return <div className="red-message-box">{playerTurn}</div>;
    else return <div className="blue-message-box">{playerTurn}</div>;
}

export default MessageBox;
