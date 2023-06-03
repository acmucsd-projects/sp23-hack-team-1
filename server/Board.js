//comment again 2
const createObjectArray = require("./wordGenerator");

let userDictionary = [];

let Board = function (redScore, blueScore, turn, words) {
    /*
This function represents the current state of the board. it keeps track of the words remaining for red & blue (ints),
whose turn it is ("red" or "blue"), and the board of words (an objectArray array)
*/

    this.redScore = redScore;
    this.blueScore = blueScore;
    this.turn = turn;
    this.words = words;

    this.printBoard = () => {
        console.log(this);
    };
};

function newBoard() {
    let newboard;
    if (userDictionary.length >= 25) {
        newboard = new Board(9, 8, "red", createObjectArray(userDictionary));
    } else {
        newboard = new Board(9, 8, "red", createObjectArray());
    }
    return newboard;
}

function customizeNewBoard(dictionary) {
    userDictionary = dictionary;
    let customizedNewBoard = newBoard();
    return customizedNewBoard;
}

function clearDictionary() {
    userDictionary = [];
}

//changes the current team's turn to pick words
function endTurn(board) {
    if (board.turn === "red") {
        board.turn = "blue";
    } else if (board.turn == "blue") {
        board.turn = "red";
    } else {
        board.turn = "Something weird happened, check the request";
    }
    return board;
}

function endGame(curBoard, team) {
    curBoard.winner = team;
    return curBoard;
    //do more here later
}

function checkMatch(source, hint) {
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
  

//index is an int
function guessWord(index1, sampleBoard) {
    index1 = parseInt(index1);
    if (index1 === undefined || index1 < 0 || index1 > 24) {
        return "index1 not valid";
    }
    let word = sampleBoard.words[index1];

    console.log(
        "inside guess word, we are changing this square:  " + word.word
    );
    if (word) {
        // console.log("\nsuccessfully found word\n, status is " + sampleBoard.words.selectedWord.status + "and color is "+ sampleBoard.words.selectedWord.type);

        if (word.status === "click") {
            return "Error, word already clicked";
        }

        if (word.type === "black") {
            team = sampleBoard.turn === "red" ? "blue" : "red";
            return endGame(sampleBoard, team);
        } else if (word.type === "white") {
            word.status = "click";
        } else if (word.type === "blue") {
            word.status = "click";
            sampleBoard.blueScore -= 1;
            if (sampleBoard.blueScore <= 0) {
                return endGame(sampleBoard, "blue");
            }
        } else if (word.type === "red") {
            word.status = "click";
            sampleBoard.redScore -= 1;
            if (sampleBoard.redScore <= 0) {
                return endGame(sampleBoard, "red");
            }
        }
    } else {
        console.log("word not found");
    }

    return sampleBoard;
}

function customizeNewBoard(dictionary) {
    userDictionary = dictionary;
    return newBoard();
}

module.exports = {
    customizeNewBoard,
    newBoard,
    clearDictionary,
    guessWord,
    endTurn,
    checkMatch,
};
