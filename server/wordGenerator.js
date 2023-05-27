const nouns = require("./default_dictionary");


function createObjectArray(dictionary = nouns){

  const numRedCards = 9;
  const numBlueCards = 8;
  const numWhiteCards = 7;
//shuffle an copied noun array
const shuffledWords = dictionary.slice().sort(() => Math.random() - 0.5);
const selectedWords = shuffledWords.slice(0, 25);
let objectArray = [];
//put 8 red card into object array
for(let i = 0; i < numRedCards; i++){
    objectArray.push({
        type : "red",
        word : selectedWords[i],
        status : "unclick"
    });
}
//put 8 blue card into object array
for(let i = numRedCards; i < numBlueCards + numRedCards; i++){
    objectArray.push({
        type : "blue",
        word : selectedWords[i],
        status : "unclick"
    });
}
//put 8 white card into object array
for(let i = numBlueCards + numRedCards; i < numBlueCards + numRedCards + numWhiteCards; i++){
    objectArray.push({
        type : "white",
        word : selectedWords[i],
        status : "unclick"
    });
}
// put 1 black card into object array
objectArray.push({
    type : "black",
    word : selectedWords[numBlueCards + numRedCards + numWhiteCards],
    status : "unclick"
});
objectArray = objectArray.sort(() => Math.random() - 0.5);

//adding index to each for easier reference
for (let i =0; i < 25; i++){objectArray[i].index = i;};

//console.log(objectArray);

return objectArray
}


module.exports = createObjectArray;
