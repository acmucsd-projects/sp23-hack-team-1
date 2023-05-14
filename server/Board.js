const createObjectArray = require("./wordGenerator");
const objectArray = require("./wordGenerator");
let userDictionary = [];
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
    if(userDictionary.length>=25){
        newBoard = new Board(9,8,"red",createObjectArray(userDictionary));
    }else{
        newBoard = new Board(9,8,"red",createObjectArray())
    }
    return newBoard;
}

function customizeNewBoard(dictionary){
    userDictionary = dictionary;
    newBoard = newBoard();
    return newBoard;
}

function clearDictionary(){
    userDictionary = [];
}


module.exports = {
    customizeNewBoard,
    newBoard,
    clearDictionary
  };













