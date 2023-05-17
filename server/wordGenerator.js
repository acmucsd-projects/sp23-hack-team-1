const nouns = [
    "Apple", "Banana", "Orange", "Pear", "Pineapple",
    "Watermelon", "Mango", "Grapes", "Kiwi", "Lemon",
    "Lime", "Cherry", "Blueberry", "Strawberry", "Raspberry",
    "Peach", "Plum", "Apricot", "Avocado", "Grapefruit",
    "Papaya", "Pomegranate", "Fig", "Date", "Cranberry",
    "Gooseberry", "Blackberry", "Passionfruit", "Guava", "Lychee",
    "Coconut", "Chestnut", "Almond", "Walnut", "Pecan",
    "Pistachio", "Cashew", "Hazelnut", "Peanut", "Macadamia",
    "Butter", "Cheese", "Milk", "Cream", "Sofa",
    "Table", "Chair", "Lamp", "Mirror", "Curtain",
    "Rug", "Painting", "Sculpture", "Pottery", "Vase",
    "Candle", "Picture", "Book", "Magazine", "Newspaper",
    "Journal", "Diary", "Calendar", "Clock", "Watch",
    "Necklace", "Bracelet", "Ring", "Earring", "Brooch",
    "Scarf", "Hat", "Gloves", "Socks", "Shoes",
    "Boots", "Sandals", "Slippers", "Backpack", "Briefcase",
    "Purse", "Wallet", "Sunglasses", "Umbrella", "Raincoat",
    "Jacket", "Coat", "Blouse", "T-Shirt", "Sweater",
    "Dress", "Skirt", "Jeans", "Pants", "Shorts",
    "Suit", "Tie", "Belt", "Underwear", "Bathrobe",
    "Pyjamas", "Towel", "Shampoo", "Soap", "Toothbrush",
    "Toothpaste", "Mouthwash", "Deodorant", "Perfume", "Lotion",
    "Sunscreen", "Makeup", "Nail polish", "Razor", "Shaving cream",
    "Tweezers", "Scissors", "Comb", "Brush", "Hair dryer",
    "Straightener", "Curler", "Iron", "Vacuum", "Mop",
    "Broom", "Dustpan", "Bucket", "Sponge", "Tissue",
    "Trash can", "Dish", "Fork", "Knife", "Spoon",
    "Plate", "Bowl", "Cup", "Mug", "Glass",
    "Bottle", "Can", "Box", "Bag", "Cookie"
  ];


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