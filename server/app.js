const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
//Gonzalo trying out server
const http = require("http");
//const hostName = "127.0.0.1";
const port = 8001;

const cors = require("cors");

//end server

//const usersRouter = require('./routes/users');
const Board = require('./Board');
const { application } = require("express");

let currentBoard = {};


const newBoard = Board.newBoard;
const endTurn = Board.endTurn;
const guessWord = Board.guessWord;

const app = express();

//app.use(logger("dev"));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

// NOTE: just for development purposes. some reason there is conflict
// on mac and no conflict on windows ...
app.use(
    cors({
        origin: ["http://localhost:3000", "*", // changing this for heroku, it seems bad for security though. it was "http://localhost:3001"],
        credentials: true,
    })
);

//app.use("/users", usersRouter);

dotenv.config();


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB database');
});

const UserSchema = mongoose.Schema({
    id:{type: String, required: true},
    password:{type: String, required: true},});


const server = http.createServer(app);

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

app.get("/api/clearDictionary", (req, res) => {
    Board.clearDictionary();
    res.send("user's dictionary is cleared");
});

app.get(
    "/api/guess",

    (req, res) => {
        let b = guessWord(req.query.index, currentBoard);
        currentBoard = b;
        res.json(currentBoard);
    }
);


app.get('/api/endturn',

(req,res) => {
  res.json(endTurn(currentBoard))
}

)

app.get('/',

(req,res) => {res.json(currentBoard)}

)


module.exports = app;
