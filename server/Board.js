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


//changes the current team's turn to pick words
function endTurn(board,team){
if (team === "red") {board.team = "blue"}
else if (team == "blue"){board.team = "red"}
else {board.team = "Something weird happened, check the request"};
return board;

}


//module.exports = newBoard;

exports.newBoard = newBoard;

exports.endTurn = endTurn;












