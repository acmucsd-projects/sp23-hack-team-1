import "./Counter.css"

function Counter({ guessAmount }){
    return(
        <div className = "counter">
            { guessAmount }
        </div>
    )
}

export default Counter; 