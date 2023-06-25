const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");




require("dotenv").config();
//Gonzalo trying out server, deploying from newly created branch!
const http = require("http");
//const hostName = "127.0.0.1";
const port = 8001;

const cors = require("cors");

//end server

//const usersRouter = require('./routes/users');

const Board = require('./Board');
//const { application } = require("express");
const { Socket } = require("dgram");

let currentBoard;


const newBoard = Board.newBoard;
const endTurn = Board.endTurn;
const guessWord = Board.guessWord;
const selectWord = Board.selectWord;

const app = express();

//app.use(logger("dev"));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

app.use(
    cors({
        origin: "*", // changing this for heroku, it seems bad for security though. it was "http://localhost:3001",
        credentials: true,
    })
);

//app.use("/users", usersRouter);

dotenv.config();

//NO DB YET
/*
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB database');
});
*/

const server = http.createServer(app);

//making websocket connection
let websocket = require('socket.io')(server,
  {cors: {origin: "*"}}
  );

websocket.on('connection',
(socket) => {console.log("user connected to websockets");
 socket.on("update", (message) =>{
  console.log("update received from user");
  websocket.emit("updateBoard",currentBoard)})

} //end of connection event

) //end of websocket

//what port is it listening on?




//prints a log once the server starts listening
//change back to server.listen if needed
server.listen(process.env.PORT || port, () => {
    console.log(`Server1 running on port ${process.env.PORT}`);
});

//create and return a new board based on user's dictionary
app.post('/api/newboard', (req,res)=>{

  
  //if user did not input their own dictionary, generate new board using default dict
  if (!req.body.customizedDict) {
    currentBoard = newBoard();
    res.json(currentBoard);
  } 
  //if user did input their own dictionary and it has enough word to turn it into dictionary
  else if (req.body.customizedDict.length >= 25) {
    //console.log("customizedDict is "+ req.body.customizedDict);
    currentBoard = Board.customizeNewBoard(req.body.customizedDict);
    
    res.json(currentBoard);
  }
  //report an error message if words is not enough
  else {
    res.send('Array must have at least 25 elements');
  }
});

app.get('/api/clearDictionary', (req,res)=>{
  Board.clearDictionary();
  res.send("user's dictionary is cleared");
});



app.get("/api/guess",

(req,res) => {

let b = guessWord(req.query.index,currentBoard);
currentBoard = b;
res.json(currentBoard);

}

);

app.get("/api/checkHints", (req, res)=>{
  const hint = req.query.hint;
  const isMatch = Board.checkMatch(currentBoard, hint);
  res.json(isMatch);
})



app.get("/api/selectword",

(req,res) => {
let c = selectWord(req.query.currentWordGuess,req.query.playerGuess,currentBoard);
currentBoard = c;
res.json(currentBoard);

}

);


app.get('/api/endgame',
(req,res) => {currentBoard = undefined; res.json("Game over, board deleted");}

)

app.get('/api/endturn',

(req,res) => {
  res.json(endTurn(currentBoard))
}

)

app.get('/',

(req,res) => {

  if (currentBoard === undefined) {console.log("board is empty, making new");currentBoard = newBoard();res.json(currentBoard); }
  else{res.json(currentBoard)}

}

)


module.exports = app;

