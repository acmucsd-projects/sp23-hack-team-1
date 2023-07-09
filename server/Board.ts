//comment again 2

let existingSequences: string[] = []
let createObjectArrayBoard = require("./wordGenerator.js")


const objectArray = require("./wordGenerator");
let userDictionary = [];

type turnType = "Red Spy" | "Blue Spy" | "Red Guess" | "Blue Guess" | "Something weird happened, check the request";
type colorType = "red" | "blue" | "white" | "black";

type cellType = {
 color: colorType
 word: String
 status: "click" | "unclick"

}

class Board {
    redScore: number
    blueScore: number
    turn: turnType
    words: cellType[]
    playerGuess: number
    currentWordGuess:String = null;
    winner: "Red" | "Blue" = null;

    constructor(redScore:number,blueScore:number,turn:turnType,words:cellType[],
    playerGuess:number = null, currentWordGuess:String = null,winner:"Red" | "Blue" = null){

        this.redScore = redScore;
        this.blueScore = blueScore;
        this.turn = turn;
        this.words = words;
        this.playerGuess = playerGuess;
        this.currentWordGuess = currentWordGuess;
        this.winner = winner;
        }


    printBoard():void{console.log(this)}


}


/*
let Board = function(redScore,blueScore,turn,words,playerGuess = null, currentWordGuess = null,winner=null){


This function represents the current state of the board. it keeps track of the words remaining for red & blue (ints),
whose turn it is ("red" or "blue"), and the board of words (an objectArray array)


this.redScore = redScore;
this.blueScore = blueScore;
this.turn = turn;
this.words = words;
this.playerGuess = playerGuess;
this.currentWordGuess = currentWordGuess;
this.winner = winner;

this.printBoard = () => {console.log(this)};

} */


function newBoard(){
    let newboard: Board;
    
    if(userDictionary.length>=25){
        console.log("we triggered custom board")
        newboard = new Board(9,8,"Red Spy",createObjectArrayBoard(userDictionary));
    }else{
        newboard = new Board(9,8,"Red Spy",createObjectArrayBoard())
    }
    return newboard;
}

function customizeNewBoard(dictionary:cellType[]){
    console.log("dictionary is "+ dictionary);
    userDictionary = dictionary;
    let customizedNewBoard = newBoard();
    console.log("returning this: " +customizedNewBoard.words[0]);
    
    return customizedNewBoard;
}

function clearDictionary():void{
    userDictionary = [];
}


//changes the current team's turn to pick words
function endTurn(board:Board){
if (board.turn === "Red Spy") {board.turn = "Red Guess"}
else if (board.turn === "Red Guess"){board.turn = "Blue Spy"}
else if (board.turn === "Blue Spy") {board.turn = "Blue Guess"}
else if (board.turn === "Blue Guess") {board.turn = "Red Spy"}
else {board.turn = "Something weird happened, check the request"};
return board;

}


function endGame(curBoard:Board,team:"Red" | "Blue"){
    curBoard.winner = team;
    return curBoard;
    //do more here later
}

//check if hint is valid
function checkMatch(source:Board, hint:string):boolean {
    if(source === undefined || source.words === undefined){
        return false; 
    }
    var pattern = /^[a-zA-Z]+$/;
    if (pattern.test(hint)===false) return false; 
    for (let i = 0; i < source.words.length; i++) {
      const word = source.words[i].word;
      if (word === hint) {
        return false;
      }
      if (hint.length >= 5) {
        for (let j = 0; j <= word.length - 5; j++) {
          const substring = word.substring(j, j + 5);
          if (hint.includes(substring)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  


//index2 is a string that contains an int
function guessWord(index2:string,sampleBoard:Board) {
   
    let index1:number = parseInt(index2);
    if (index1 === undefined|| index1 <0 || index1 > 24) {return "index1 not valid"};
    let word:cellType = sampleBoard.words[index1];

    

    console.log("inside guess word, we are changing this square:  " + word.word);
    if (word) {

        let team: "Red" | "Blue";
       // console.log("\nsuccessfully found word\n, status is " + sampleBoard.words.selectedWord.status + "and color is "+ sampleBoard.words.selectedWord.type);

        if (word.status === "click") {return "Error, word already clicked";};


        if (word.color === "black") {
            team = sampleBoard.turn === 'Red Spy' || sampleBoard.turn === "Red Guess" ? 'Blue' : 'Red';
            word.status = "click";
            sampleBoard.playerGuess = sampleBoard.playerGuess - 1;

            //dont need to do if (sampleBoard.playerGuess <= 0) {return endTurn(sampleBoard);};

            return endGame(sampleBoard, team);
        }

        else if (word.color === "white") {
            word.status = "click";
            sampleBoard.playerGuess = sampleBoard.playerGuess - 1;

            if (sampleBoard.playerGuess <= 0) {return endTurn(sampleBoard);};
        }

        else if (word.color === "blue") {
            word.status = "click";
            sampleBoard.blueScore -= 1;
            sampleBoard.playerGuess = sampleBoard.playerGuess - 1;
            if (sampleBoard.blueScore <= 0){return endGame(sampleBoard, "Blue");};

            if (sampleBoard.playerGuess <= 0) {return endTurn(sampleBoard);};


        }
        else if (word.color === "red") {
            word.status = "click";
            sampleBoard.redScore -= 1;
            sampleBoard.playerGuess = sampleBoard.playerGuess - 1;
            if (sampleBoard.redScore <= 0){return endGame(sampleBoard, "Red");};
            
            
            if (sampleBoard.playerGuess <= 0) {return endTurn(sampleBoard);};
        }

    }
    else {console.log("word not found")};
    
    return sampleBoard;
}


//Function For Spymasters to select word
function selectWord(word1:string,numGuesses:number,sampleBoard:Board){

    if (numGuesses < 1) {return "Error, number of guesses can't be less than 1!"}

    sampleBoard.playerGuess = numGuesses;
    sampleBoard.currentWordGuess = word1;
    return endTurn(sampleBoard);
}


//module.exports = newBoard;
module.exports = {
    customizeNewBoard,
    newBoard,
    clearDictionary,
    guessWord,
    selectWord,
    checkMatch,
    endTurn
  };












