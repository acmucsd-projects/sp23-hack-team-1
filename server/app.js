const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Gonzalo trying out server
const http = require("http");
const hostName = "127.0.0.1";
const port = 8001;

const cors = require("cors");

//end server

const usersRouter = require("./routes/users");
const Board = require("./Board");

let currentBoard = {};

const newBoard = Board.newBoard;
const endTurn = Board.endTurn;
const guessWord = Board.guessWord;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// NOTE: just for development purposes. some reason there is conflict
// on mac and no conflict on windows ...
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:3001"],
        credentials: true,
    })
);

app.use("/users", usersRouter);

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

//prints a log once the server starts listening

server.listen(port, hostName, function () {
    console.log(`Server1 running on http://${hostName}:${port}`);
});

//create and return a new board based on user's dictionary
app.post("/api/newboard", (req, res) => {
    //if user did not input their own dictionary, generate new board using default dict
    if (!req.body.customizedDict) {
        currentBoard = Board.newBoard();
        res.json(currentBoard);
    }
    //if user did input their own dictionary and it has enough word to turn it into dictionary
    else if (req.body.customizedDict.length >= 25) {
        res.json(Board.customizeNewBoard(req.body.customizedDict));
    }
    //report an error message if words is not enough
    else {
        res.send("Array must have at least 25 elements");
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

app.get(
    "/api/endturn",

    (req, res) => {
        res.json(endTurn(currentBoard));
    }
);

module.exports = app;
