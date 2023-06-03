/* ButtonDropdown.js */

import "./ButtonDropdown.css";

function ButtonDropdown({ handleOptionClick }) {
    return (
        <div className="dropdown-container">
            <button
                className="dropdown-button red-team"
                onClick={() => handleOptionClick("Red Spy")}>
                Red Spy
            </button>
            <button
                className="dropdown-button red-team"
                onClick={() => handleOptionClick("Red Guesser")}>
                Red Guesser
            </button>
            <button
                className="dropdown-button blue-team"
                onClick={() => handleOptionClick("Blue Spy")}>
                Blue Spy
            </button>
            <button
                className="dropdown-button blue-team"
                onClick={() => handleOptionClick("Blue Guesser")}>
                Blue Guesser
            </button>
        </div>
    );
}

export default ButtonDropdown;
