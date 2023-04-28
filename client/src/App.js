import { useState, useEffect } from "react";

import WordCell from "./components/Word Cell/WordCell";

import "./App.css";

function App() {
    const [cells, setCells] = useState([
        "test1",
        "test2",
        "test3",
        "test4",
        "test5",
        "test6",
        "test7",
        "test8",
        "test9",
    ]);

    return (
        <div className="App">
            {cells.map((cell, index) => (
                <WordCell word={cell} key={`${cell}-${index}`} />
            ))}
        </div>
    );
}

export default App;
