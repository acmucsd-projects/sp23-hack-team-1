const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


//Gonzalo trying out server
const http = require('http');
const hostName = "127.0.0.1";
const port = 8000;

//end server

const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);

dotenv.config();


//NO DB YET
/*
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB database');
});
*/


const server = http.createServer(function (req,res){

  //write header
  res.writeHead(200,{"Content-Type": "text/plain"});
  //send response body
  res.end("Hello World\n")
});



//prints a log once the server starts listening

server.listen(port,hostName,function() {console.log(`Server1 running on http://${hostName}:${port}`)});


module.exports = app;