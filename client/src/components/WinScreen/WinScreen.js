import React, { useEffect, useState } from "react";
import "./WinScreen.css";

function WinScreen({ winner }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000); // Change the value (in milliseconds) to adjust the duration of the animation

        return () => clearTimeout(timer);
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <div className="win-screen-overlay">
            <div className="win-screen-content">
                {winner === "red" ? "Red has won!" : "Blue has won!"}
            </div>
        </div>
    );
}

export default WinScreen;
