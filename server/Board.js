//comment again 2
const createObjectArray = require("./wordGenerator");
const objectArray = require("./wordGenerator");
let userDictionary = [];


let Board = function(redScore,blueScore,turn,words,playerGuess = null, currentWordGuess = null){

/*
This function represents the current state of the board. it keeps track of the words remaining for red & blue (ints),
whose turn it is ("red" or "blue"), and the board of words (an objectArray array)
*/

this.redScore = redScore;
this.blueScore = blueScore;
this.turn = turn;
this.words = words;
this.playerGuess = playerGuess;
this.currentWordGuess = currentWordGuess;


this.printBoard = () => {console.log(this)};

}


function newBoard(){
    let newboard;
    
    if(userDictionary.length>=25){
        console.log("we triggered custom board")
        newboard = new Board(9,8,"Red Spy",createObjectArray(userDictionary));
    }else{
        newboard = new Board(9,8,"Red Spy",createObjectArray())
    }
    return newboard;
}

function customizeNewBoard(dictionary){
    console.log("dictionary is "+ dictionary);
    userDictionary = dictionary;
    let customizedNewBoard = newBoard();
    console.log("returning this: " +customizedNewBoard.words[0]);
    
    return customizedNewBoard;
}

function clearDictionary(){
    userDictionary = [];
}


//changes the current team's turn to pick words
function endTurn(board){
if (board.turn === "Red Spy") {board.turn = "Red Guess"}
else if (board.turn === "Red Guess"){board.turn = "Blue Spy"}
else if (board.turn === "Blue Spy") {board.turn = "Blue Guess"}
else if (board.turn === "Blue Guess") {board.turn = "Red Spy"}
else {board.turn = "Something weird happened, check the request"};
return board;

}


function endGame(team){
    return team +" has won! play again?"
    //do more here later
}

//index is an int
function guessWord(index1,sampleBoard) {
   
    index1 = parseInt(index1);
    if (index1 === undefined|| index1 <0 || index1 > 24) {return "index1 not valid"};
    let word = sampleBoard.words[index1];

    

    console.log("inside guess word, we are changing this square:  " + word.word);
    if (word) {


       // console.log("\nsuccessfully found word\n, status is " + sampleBoard.words.selectedWord.status + "and color is "+ sampleBoard.words.selectedWord.type);

        if (word.status === "click") {return "Error, word already clicked";};


        if (word.type === "black") {
            team = sampleBoard.turn === 'red' ? 'blue' : 'red';
            word.status = "click";
            sampleBoard.playerGuess = sampleBoard.playerGuess - 1;

            //dont need to do if (sampleBoard.playerGuess <= 0) {return endTurn(sampleBoard);};

            return endGame(team);
        }

        else if (word.type === "white") {
            word.status = "click";
            sampleBoard.playerGuess = sampleBoard.playerGuess - 1;

            if (sampleBoard.playerGuess <= 0) {return endTurn(sampleBoard);};
        }

        else if (word.type === "blue") {
            word.status = "click";
            sampleBoard.blueScore -= 1;
            sampleBoard.playerGuess = sampleBoard.playerGuess - 1;
            if (sampleBoard.blueScore <= 0){return endGame("blue");};

            if (sampleBoard.playerGuess <= 0) {return endTurn(sampleBoard);};


        }
        else if (word.type === "red") {
            word.status = "click";
            sampleBoard.redScore -= 1;
            sampleBoard.playerGuess = sampleBoard.playerGuess - 1;
            if (sampleBoard.redScore <= 0){return endGame("red");};
            
            
            if (sampleBoard.playerGuess <= 0) {return endTurn(sampleBoard);};
        }

    }
    else {console.log("word not found")};
    
    return sampleBoard;
}


//Function For Spymasters to select word
function selectWord(word1,numGuesses,sampleBoard){
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
    endTurn
  };












