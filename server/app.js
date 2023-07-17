var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Reminder to import Request and Response Types from express when you convert to typescript
const express = require("express");
const dotenv = require("dotenv");
const sequence = require("./generateRoomCode");
const pclient = require("@prisma/client");
const PrismaClient = pclient.PrismaClient;
require("dotenv").config();
const http = require("http");
const port = 8001;
const cors = require("cors");
//const Board = require('./Board');
const { Socket } = require("dgram");
const { Prisma } = require("@prisma/client");
//const axios = require("axios");
let currentBoard;
let existingSequences = [];
let Bstuff = require("./Board.js");
//const newBoard = Board.newBoard;
//const endTurn = Board.endTurn;
//const guessWord = Board.guessWord;
//const selectWord = Board.selectWord;
const app = express();
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: "*",
    credentials: true,
}));
dotenv.config();
const prisma = new PrismaClient();
const server = http.createServer(app);
//making websocket connection
let websocket = require('socket.io')(server, { cors: { origin: "*" } });
websocket.on('connection', (socket) => {
    console.log("user connected to websockets");
    //Join Room
    socket.on("joinRoom", (req) => {
        //console.log("reached joinRoom")
        let code = req;
        socket.join(code);
        console.log("user joined " + code);
    });
    socket.on("update", (req) => __awaiter(this, void 0, void 0, function* () {
        console.log("update received from user");
        let code = req;
        let sharedBoard = yield getBoardFromCode(code);
        //console.log(sharedBoard); //delete
        //so it can actually retrieve the board but it is not sending the response back unless that request connected to the channel
        websocket.to(code).emit("updateBoard", sharedBoard);
    }));
    //websocket.emit("updateBoard",)})
}); //end of websocket
//Helper Function to get JSON Board State from Room Code
function getBoardFromCode(myCode) {
    return __awaiter(this, void 0, void 0, function* () {
        let myBoard = yield prisma.room.findUnique({ where: { roomCode: myCode } });
        return myBoard.boardState;
    });
}
//prints a log once the server starts listening
//change back to server.listen if needed
server.listen(process.env.PORT || port, () => {
    console.log(`Server1 running on port ${process.env.PORT || port}`);
});
//Once This is pinged by front end, it will create a new board in the database with a random 4 character room code. returns the room code
app.post('/api/newboard', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let newRoomCode = sequence.generateUniqueSequence(existingSequences);
    console.log("new room code is " + newRoomCode);
    //if user did not input their own dictionary, generate new board using default dict
    if (!req.body.customizedDict) {
        let userBoard = Bstuff.newBoard();
        let createdBoard = yield prisma.room.create({
            data: {
                roomCode: newRoomCode,
                boardState: userBoard
            }
        });
        res.json(newRoomCode);
    }
    //if user did input their own dictionary and it has enough word to turn it into dictionary
    else if (req.body.customizedDict.length >= 25) {
        //console.log("customizedDict is "+ req.body.customizedDict);
        let userBoard = Bstuff.customizeNewBoard(req.body.customizedDict);
        let createdBoard = yield prisma.room.create({
            data: {
                roomCode: newRoomCode,
                boardState: userBoard
            }
        });
        res.json(newRoomCode);
    }
    //report an error message if words is not enough
    else {
        res.send('Array must have at least 25 elements');
    }
}));
/*IDK if this fits into the new iteration of the program
app.get('/api/clearDictionary', (req,res)=>{
  Board.clearDictionary();
  res.send("user's dictionary is cleared");
}); */
//This PUT endpoint takes the room code as a query as input. Then it grabs the according board state and guesses the word, and updates db with new
//board. returns board
app.put("/api/guess", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let inputCode = req.query.code;
    //console.log("in guess, code is " + inputCode);
    let inputBoard = yield getBoardFromCode(inputCode);
    let b = Bstuff.guessWord(req.query.index, inputBoard);
    //update inputBoard in DB with b
    let updatedBoard = yield prisma.room.update({
        where: { roomCode: inputCode },
        data: { boardState: b }
    });
    res.json(updatedBoard.boardState);
}));
//This function takes a room code and a hint and returns if the hint is valid (boolean)
app.get("/api/checkHints", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let frontCode = req.query.code;
    let existingBoard = yield getBoardFromCode(frontCode);
    const hint = req.query.hint;
    const isMatch = Bstuff.checkMatch(existingBoard, hint);
    res.json(isMatch);
}));
//This lets the spymasters pick a word and returns the board with currentWordGuess altered and turn changed.
app.put("/api/selectword", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let inputCode = req.query.code;
    let inputBoard = yield getBoardFromCode(inputCode);
    //console.log(inputCode)
    //console.log(inputBoard)
    let c = Bstuff.selectWord(req.query.currentWordGuess, req.query.playerGuess, inputBoard);
    let updatedBoard = yield prisma.room.update({
        where: { roomCode: inputCode },
        data: { boardState: c }
    });
    res.json(updatedBoard.boardState);
}));
//this endpoint makes a new board state for the given room code.
app.put('/api/newgame', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let inputCode = req.query.code;
    let resetBoard;
    //I think that it would be cool for word sets to be preserved with Userss after authentication, but for now just send the word list in the body
    if (req.body.customizedDict == undefined) {
        resetBoard = Bstuff.newBoard();
    }
    else {
        resetBoard = Bstuff.customizeNewBoard(req.body.customizedDict);
    }
    let updatedBoard = yield prisma.room.update({
        where: { roomCode: inputCode },
        data: { boardState: resetBoard }
    });
    res.json(updatedBoard.boardState);
}));
//This deletes the entire db entry with the room code and board state,, removes roomCode from existing sequences
app.delete('/api/endgame', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let inputCode = req.query.code;
    let deletedBoard = yield prisma.room.delete({
        where: { roomCode: inputCode }
    });
    existingSequences = existingSequences.filter(string => !string.includes(inputCode)); //removes room code from existing sequences
    res.json(deletedBoard.boardState);
}));
//I don't think this endpoint is targeted from normal gameplay, just the function itself internally
/*
app.get('/api/endturn',

(req,res) => {
  res.json(endTurn(currentBoard))
}

)*/
app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let frontCode = req.query.code;
    if (frontCode === undefined) {
        console.log("board is empty, making new");
        let newRoomCode = sequence.generateUniqueSequence(existingSequences);
        let userBoard = Bstuff.newBoard();
        let createdBoard = yield prisma.room.create({
            data: {
                roomCode: newRoomCode,
                boardState: userBoard
            }
        });
        //console.log(createdBoard);
        res.json(createdBoard.boardState);
    }
    else {
        let existingBoard = yield getBoardFromCode(frontCode);
        res.json(existingBoard);
    }
}));
module.exports = app;
//# sourceMappingURL=app.js.map