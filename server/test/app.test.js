const request = require('supertest');
const app = require("../app");


/* You actually don't have to run the server in order for the tests to work! pretty cool imo */

describe("sample tests",()=>{

    //test.todo("does 1 equal 1?")

    test("does 3 equal 3?",
    
    ()=>{

        let a = 3;
        a--;
        a++;

        expect(a).toBe(3);

    });
})


describe("API Localhost Tests", ()=>{

    test("Simulating a game", async ()=>{


    //Generating new Board
    const response1 = await request(app).get('/');
    expect(response1.status).toBe(200);
    //console.log(response.body);
    expect(response1.body).toBeInstanceOf(Object);

    //selecting a word - playerGuess and currentWordGuess should update, and turn should be "Red Guess"
    const response2 = await request(app).get('/api/selectword?currentWordGuess=china&playerGuess=3');
    expect(response2.status).toBe(200);
    expect(response2.body).toBeInstanceOf(Object);

    expect(response2.body.playerGuess).toEqual("3");
    expect(response2.body.currentWordGuess).toEqual("china");
    expect(response2.body.turn).toEqual("Red Guess");

    //checking hints? TODO


    //getting words
    let redIndex;
    let blueIndex;
    let whiteIndex;
    let blackIndex;

    for (let i = 0; i<= 24; i++){

        if (response2.body.words[i].color === "red") {redIndex = i;}
        else if (response2.body.words[i].color === "blue") {blueIndex = i;}
        else if (response2.body.words[i].color === "white") {whiteIndex = i;}
        else if (response2.body.words[i].color === "black") {blackIndex = i;}

    }

    //console.log(response2.body.words)
    //console.log(`${redIndex} ${blueIndex} ${whiteIndex} ${blackIndex}`);

    //Guessing a word that is red
    const response3 = await request(app).get(`/api/guess?index=${redIndex}`);
    expect(response3.status).toBe(200);
    expect(response3.body).toBeInstanceOf(Object);

    expect(response3.body.redScore).toEqual(8);
    expect(response3.body.words[redIndex].status).toEqual("click");
    expect(response3.body.playerGuess).toEqual(2);
    
    //Guessing a word that is blue

    const response4 = await request(app).get(`/api/guess?index=${blueIndex}`);
    expect(response4.status).toBe(200);
    expect(response4.body).toBeInstanceOf(Object);

    expect(response4.body.blueScore).toEqual(7);
    expect(response4.body.words[blueIndex].status).toEqual("click");
    expect(response4.body.playerGuess).toEqual(1);
    //Guessing a word that is white

    const response5 = await request(app).get(`/api/guess?index=${whiteIndex}`);
    expect(response5.status).toBe(200);
    expect(response5.body).toBeInstanceOf(Object);

    expect(response5.body.blueScore).toEqual(7);
    expect(response5.body.words[whiteIndex].status).toEqual("click");
    expect(response5.body.playerGuess).toEqual(0);

    //Did the turn change to blue spy?
    expect(response5.body.turn).toEqual("Blue Spy");
    
    //Guess another word (Blue Spy)
    const response6 = await request(app).get('/api/selectword?currentWordGuess=burgers&playerGuess=2');
    expect(response6.status).toBe(200);
    expect(response6.body).toBeInstanceOf(Object);

    expect(response6.body.playerGuess).toEqual("2");
    expect(response6.body.currentWordGuess).toEqual("burgers");
    expect(response6.body.turn).toEqual("Blue Guess");


    //Blue Guesser guesses the black square and the game ends with red as the winner. 
    const response7 = await request(app).get(`/api/guess?index=${blackIndex}`);
    expect(response7.status).toBe(200);
    expect(response7.body).toBeInstanceOf(Object);
    console.log(blackIndex);
    expect(response7.body.winner).toEqual("Red");


    })




})