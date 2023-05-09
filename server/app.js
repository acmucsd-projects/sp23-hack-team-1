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

const usersRouter = require('./routes/users');
const Board = require('./Board');

const newBoard = Board.newBoard;
const endTurn = Board.endTurn;


const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    cors({
        origin: "http://localhost:8001",
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

//create and return a new board
app.get(
    "/api/newboard",

    (req, res) => {
        res.json(newBoard());
    }
);



app.get('/api/newboard',

(req,res) => {
  res.json(endTurn(req.query.board,req.query.team))
}


)


module.exports = app;

