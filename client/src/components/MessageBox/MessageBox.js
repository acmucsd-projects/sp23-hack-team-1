import LoadingSymbol from "../LoadingSymbol/LoadingSymbol";
import "./MessageBox.css";

function MessageBox({ playerTurn, role }) {
    return (
        <div className="position-box">
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "right",
                }}>
                <div
                    className={`${
                        playerTurn[0] === "R" ? "red" : "blue"
                    }-message-box`}>
                    {playerTurn}'s Turn
                </div>
                {playerTurn !== role && <LoadingSymbol />}
            </div>
        </div>
    );
}

export default MessageBox;
