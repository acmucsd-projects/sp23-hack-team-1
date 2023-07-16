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


    //Generating new Code
    const response1 = await request(app).post('/api/newBoard');
    expect(response1.status).toBe(200);
    //console.log(typeof(response1.body));
    expect( typeof(response1.body)).toBe("string");
    let codeWord = "&code=" + response1.body;

    //selecting a word - playerGuess and currentWordGuess should update, and turn should be "Red Guess"
    console.log('/api/selectword?currentWordGuess=china&playerGuess=3' + codeWord);
    const response2 = await request(app).put('/api/selectword?currentWordGuess=china&playerGuess=3' + codeWord);
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
    const response3 = await request(app).put(`/api/guess?index=${redIndex}` + codeWord);
    expect(response3.status).toBe(200);
    expect(response3.body).toBeInstanceOf(Object);

    expect(response3.body.redScore).toEqual(8);
    expect(response3.body.words[redIndex].status).toEqual("click");
    expect(response3.body.playerGuess).toEqual(2);
    
    //Guessing a word that is blue

    const response4 = await request(app).put(`/api/guess?index=${blueIndex}`+codeWord);
    expect(response4.status).toBe(200);
    expect(response4.body).toBeInstanceOf(Object);

    expect(response4.body.blueScore).toEqual(7);
    expect(response4.body.words[blueIndex].status).toEqual("click");
    expect(response4.body.playerGuess).toEqual(1);
    //Guessing a word that is white

    const response5 = await request(app).put(`/api/guess?index=${whiteIndex}`+codeWord);
    expect(response5.status).toBe(200);
    expect(response5.body).toBeInstanceOf(Object);

    expect(response5.body.blueScore).toEqual(7);
    expect(response5.body.words[whiteIndex].status).toEqual("click");
    expect(response5.body.playerGuess).toEqual(0);

    //Did the turn change to blue spy?
    expect(response5.body.turn).toEqual("Blue Spy");
    
    //Guess another word (Blue Spy)
    const response6 = await request(app).put('/api/selectword?currentWordGuess=burgers&playerGuess=2'+codeWord);
    expect(response6.status).toBe(200);
    expect(response6.body).toBeInstanceOf(Object);

    expect(response6.body.playerGuess).toEqual("2");
    expect(response6.body.currentWordGuess).toEqual("burgers");
    expect(response6.body.turn).toEqual("Blue Guess");


    //Blue Guesser guesses the black square and the game ends with red as the winner. 
    const response7 = await request(app).put(`/api/guess?index=${blackIndex}`+codeWord);
    expect(response7.status).toBe(200);
    expect(response7.body).toBeInstanceOf(Object);
    console.log(blackIndex);
    expect(response7.body.winner).toEqual("Red");


    //test newgame
    const response8 = await request(app).put('/api/newgame?code='+response1.body);
    expect(response8.status).toBe(200);
    expect(response8.body).toBeInstanceOf(Object);
    expect(response8.body.redScore).toEqual(9);
    expect(response8.body.turn).toEqual("Red Spy")
    
    //test endgame
    const response9 = await request(app).delete('/api/endgame?code=' + response1.body);
    expect(response9.status).toBe(200);
    expect(response9.body).toBeInstanceOf(Object);

    const response10 = await request(app).put("'/api/selectword?currentWordGuess=burgers2&playerGuess=2"+codeWord); //shouldn't work
    expect(response10.body.status).toBe(undefined);


    })




})