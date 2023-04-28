const createObjectArray = require("./wordGenerator");
const objectArray = require("./wordGenerator");

let Board = function(redScore,blueScore,turn,words){

/*
This function represents the current state of the board. it keeps track of the words remaining for red & blue (ints),
whose turn it is ("red" or "blue"), and the board of words (an objectArray array)
*/

this.redScore = redScore;
this.blueScore = blueScore;
this.turn = turn;
this.words = words;

this.printBoard = () => {console.log(this)};

}


function newBoard(){
    newBoard = new Board(9,8,"red",createObjectArray());
    return newBoard;
}


module.exports = newBoard;















