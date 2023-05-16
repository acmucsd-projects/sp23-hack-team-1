//comment again 2
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
function endTurn(board){
if (board.turn === "red") {board.turn = "blue"}
else if (board.turn == "blue"){board.turn = "red"}
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
            return endGame(team);
        }

        else if (word.type === "white") {
            word.status = "click";
            
        }

        else if (word.type === "blue") {
            word.status = "click";
            sampleBoard.blueScore -= 1;
            if (sampleBoard.blueScore <= 0){return endGame("blue");};
        }
        else if (word.type === "red") {
            word.status = "click";
            sampleBoard.redScore -= 1;
            if (sampleBoard.redScore <= 0){return endGame("red");};
        }

    }
    else {console.log("word not found")};
    
    return sampleBoard;
}





//module.exports = newBoard;

exports.newBoard = newBoard;

exports.endTurn = endTurn;

exports.guessWord = guessWord;












