import React from "react"
import "./Switch.css"


const Switch = ({ isPlayerFunction,isPlayer }) => {
    function onClick(){
        isPlayerFunction(!isPlayer)
    }
    return (
        <label className= "switch">
            <input type = "checkbox" onChange={onClick}/> 
            <span className = "slider" />
        </label>

    ); 
};

export default Switch;
