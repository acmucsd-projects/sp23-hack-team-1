import "./RoomCode.css";

function RoomCode({ roomcode }) {
    return (
        <div className="position-code">
            <div className="text">Room Code: {roomcode}</div>
        </div>
    );
}

export default RoomCode;
