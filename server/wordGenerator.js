
/*const nouns = [
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
*/
const nouns = ['Ace', 'Africa', 'Agent', 'Air', 'Alaska', 'Alien', 'Alps', 'Amazon', 'Ambulance', 'America', 'Anchor', 'Angel', 'Ant', 'Antarctica', 'Anthem', 'Apple', 'Application', 'Apron', 'Arm', 'Armor', 'Army', 'Ash', 'Astronaut', 'Atlantis', 'Attic', 'Australia', 'Avalanche', 'Axe', 'Aztec', 'Baby', 'Back', 'Bacon', 'Ball', 'Balloon', 'Banana', 'Band', 'Bank', 'Bar', 'Barbecue', 'Bark', 'Bass', 'Bat', 'Bath', 'Battery', 'Battle', 'Battleship', 'Bay', 'Beach', 'Beam', 'Bean', 'Bear', 'Beard', 'Beat', 'Bed', 'Bee', 'Beer', 'Beijing', 'Bell', 'Belt', 'Bench', 'Berlin', 'Bermuda', 'Berry', 'Bicycle', 'Big Bang', 'Big Ben', 'Bikini', 'Bill', 'Bird', 'Biscuit', 'Blacksmith', 'Blade', 'Blind', 'Blizzard', 'Block', 'Blues', 'Board', 'Bob', 'Body', 'Boil', 'Bolt', 'Bomb', 'Bond', 'Bonsai', 'Book', 'Boom', 'Boot', 'Boss', 'Bottle', 'Bow', 'Bowl', 'Bowler', 'Box', 'Boxer', 'Brain', 'Brass', 'Brazil', 'Bread', 'Break', 'Brick', 'Bride', 'Bridge', 'Brother', 'Brush', 'Bubble', 'Buck', 'Bucket', 'Buffalo', 'Bug', 'Bugle', 'Bulb', 'Bunk', 'Bus', 'Butter', 'Butterfly', 'Button', 'Cable', 'Caesar', 'Cake', 'Calf', 'Camp', 'Can', 'Canada', 'Cane', 'Cap', 'Capital', 'Captain', 'Car', 'Card', 'Carrot', 'Casino', 'Cast', 'Castle', 'Cat', 'Cave', 'Cell', 'Centaur', 'Center', 'Chain', 'Chair', 'Chalk', 'Change', 'Charge', 'Check', 'Cheese', 'Cherry', 'Chess', 'Chest', 'Chick', 'China', 'Chip', 'Chocolate', 'Christmas', 'Church', 'Circle', 'Circus', 'Cleopatra', 'Cliff', 'Cloak', 'Clock', 'Cloud', 'Club', 'Coach', 'Coast', 'Code', 'Coffee', 'Cold', 'Collar', 'Columbus', 'Comb', 'Comet', 'Comic', 'Compound', 'Computer', 'Concert', 'Conductor', 'Cone', 'Contract', 'Cook', 'Copper', 'Cotton', 'Country', 'Court', 'Cover', 'Cow', 'Cowboy', 'Crab', 'Craft', 'Crane', 'Crash', 'Cricket', 'Cross', 'Crow', 'Crown', 'Crusader', 'Crystal', 'Cuckoo', 'Curry', 'Cut', 'Cycle', 'Czech', 'Dance', 'Dash', 'Data', 'Date', 'Day', 'Death', 'Deck', 'Degree', 'Delta', 'Dentist', 'Desk', 'Diamond', 'Dice', 'Dinosaur', 'Director', 'Disease', 'Disk', 'Diver', 'Doctor', 'Dog', 'Doll', 'Dollar', 'Door', 'Draft', 'Dragon', 'Drawing', 'Dream', 'Dress', 'Dressing', 'Drill', 'Driver', 'Drone', 'Drop', 'Drum', 'Dryer', 'Duck', 'Dump', 'Dust', 'Dwarf', 'Eagle', 'Ear', 'Earth', 'Earthquake', 'Easter', 'Eden', 'Egg', 'Egypt', 'Einstein', 'Elephant', 'Elf', 'Embassy', 'Engine', 'England', 'Europe', 'Eye', 'Face', 'Fair', 'Fall', 'Fan', 'Farm', 'Fence', 'Fever', 'Fiddle', 'Field', 'Fighter', 'Figure', 'File', 'Film', 'Fire', 'Fish', 'Flag', 'Flat', 'Flood', 'Floor', 'Flute', 'Fly', 'Foam', 'Fog', 'Foot', 'Force', 'Forest', 'Fork', 'France', 'Frog', 'Frost', 'Fuel', 'Game', 'Gangster', 'Garden', 'Gas', 'Gear', 'Genie', 'Genius', 'Germany', 'Ghost', 'Giant', 'Glacier', 'Glass', 'Glasses', 'Glove', 'Go', 'Goat', 'Gold', 'Goldilocks', 'Golf', 'Governor', 'Grace', 'Grass', 'Greece', 'Green', 'Greenhouse', 'Groom', 'Ground', 'Guitar', 'Gum', 'Gymnast', 'Hair', 'Halloween', 'Ham', 'Hamburger', 'Hammer', 'Hand', 'Hawaii', 'Hawk', 'Head', 'Heart', 'Helicopter', 'Helmet', 'Hercules', 'Hide', 'Himalayas', 'Hit', 'Hole', 'Hollywood', 'Homer', 'Honey', 'Hood', 'Hook', 'Horn', 'Horse', 'Horseshoe', 'Hose', 'Hospital', 'Hotel', 'House', 'Ice', 'Ice Age', 'Ice Cream', 'Iceland', 'Igloo', 'India', 'Ink', 'Iron', 'Ivory', 'Jack', 'Jail', 'Jam', 'Jellyfish', 'Jet', 'Jeweler', 'Joan of Arc', 'Jockey', 'Joker', 'Judge', 'Jumper', 'Jupiter', 'Kangaroo', 'Ketchup', 'Key', 'Kick', 'Kid', 'Kilt', 'King', 'King Arthur', 'Kiss', 'Kitchen', 'Kiwi', 'Knife', 'Knight', 'Knot', 'Kung Fu', 'Lab', 'Lace', 'Ladder', 'Lap', 'Laser', 'Laundry', 'Lawyer', 'Lead', 'Leaf', 'Leather', 'Lemon', 'Lemonade', 'Leprechaun', 'Letter', 'Life', 'Light', 'Lightning', 'Limousine', 'Line', 'Link', 'Lion', 'Lip', 'Litter', 'Loch Ness', 'Lock', 'Locust', 'Log', 'London', 'Love', 'Luck', 'Lumberjack', 'Lunch', 'Magazine', 'Magician', 'Mail', 'Makeup', 'Mammoth', 'Manicure', 'Map', 'Maple', 'Maracas', 'Marathon', 'Marble', 'March', 'Mark', 'Mass', 'Match', 'Medic', 'Memory', 'Mercury', 'Mess', 'Meter', 'Mexico', 'Microscope', 'Microwave', 'Mile', 'Milk', 'Mill', 'Millionaire', 'Mine', 'Minotaur', 'Mint', 'Minute', 'Mirror', 'Miss', 'Missile', 'Model', 'Mohawk', 'Mole', 'Mona Lisa', 'Monkey', 'Moon', 'Moscow', 'Moses', 'Mosquito', 'Mother', 'Mount', 'Mountie', 'Mouse', 'Mouth', 'Mud', 'Mug', 'Mummy', 'Musketeer', 'Mustard', 'Nail', 'Napoleon', 'Needle', 'Nerve', 'Net', 'New York', 'Newton', 'Night', 'Ninja', 'Noah', 'Nose', 'Note', 'Notre Dame', 'Novel', 'Nurse', 'Nut', 'Nylon', 'Oasis', 'Octopus', 'Oil', 'Olive', 'Olympus', 'Onion', 'Opera', 'Orange', 'Organ', 'Pacific', 'Pad', 'Paddle', 'Page', 'Paint', 'Palm', 'Pan', 'Pants', 'Paper', 'Parachute', 'Parade', 'Park', 'Parrot', 'Part', 'Pass', 'Paste', 'Patient', 'Pea', 'Peach', 'Peanut', 'Pearl', 'Pen', 'Penguin', 'Penny', 'Pentagon', 'Pepper', 'Pew', 'Phoenix', 'Piano', 'Pie', 'Pig', 'Pillow', 'Pilot', 'Pin', 'Pine', 'Pipe', 'Pirate', 'Pistol', 'Pit', 'Pitch', 'Pitcher', 'Pizza', 'Plane', 'Plastic', 'Plate', 'Platypus', 'Play', 'Plot', 'Pocket', 'Point', 'Poison', 'Pole', 'Police', 'Polish', 'Polo', 'Pool', 'Pop', 'Popcorn', 'Port', 'Post', 'Potato', 'Potter', 'Pound', 'Powder', 'Press', 'Princess', 'Pumpkin', 'Pupil', 'Puppet', 'Purse', 'Pyramid', 'Quack', 'Quarter', 'Queen', 'Rabbit', 'Racket', 'Radio', 'Rail', 'Rainbow', 'Ram', 'Ranch', 'Rat', 'Ray', 'Razor', 'Record', 'Reindeer', 'Revolution', 'Rice', 'Rifle', 'Ring', 'Rip', 'River', 'Road', 'Robin', 'Robot', 'Rock', 'Rodeo', 'Roll', 'Rome', 'Root', 'Rope', 'Rose', 'Roulette', 'Round', 'Row', 'Rubber', 'Ruler', 'Run', 'Russia', 'Rust', 'Sack', 'Saddle', 'Sahara', 'Sail', 'Salad', 'Saloon', 'Salsa', 'Salt', 'Sand', 'Santa', 'Satellite', 'Saturn', 'Saw', 'Scale', 'Scarecrow', 'School', 'Scientist', 'Scorpion', 'Scratch', 'Screen', 'Scroll', 'Scuba', 'Scuba Diver', 'Seal', 'Second', 'Server', 'Set', 'Shadow', 'Shakespeare', 'Shampoo', 'Shark', 'Shed', 'Sheet', 'Shell', 'Sherlock', 'Sherwood', 'Ship', 'Shoe', 'Shoot', 'Shop', 'Shorts', 'Shot', 'Shoulder', 'Shower', 'Sign', 'Silk', 'Sink', 'Sister', 'Skates', 'Ski', 'Skull', 'Skyscraper', 'Sled', 'Sleep', 'Sling', 'Slip', 'Slipper', 'Sloth', 'Slug', 'Smell', 'Smoke', 'Smoothie', 'Smuggler', 'Snake', 'Snap', 'Snow', 'Snowman', 'Soap', 'Sock', 'Soldier', 'Soul', 'Sound', 'Soup', 'Space', 'Spell', 'Sphinx', 'Spider', 'Spike', 'Spine', 'Spirit', 'Spoon', 'Spot', 'Spray', 'Spring', 'Spurs', 'Spy', 'Square', 'Squash', 'Squirrel', 'St. Patrick', 'Stable', 'Stadium', 'Staff', 'Stamp', 'Star', 'State', 'Steam', 'Steel', 'Step', 'Stethoscope', 'Stick', 'Sticker', 'Stock', 'Storm', 'Story', 'Straw', 'Stream', 'Street', 'Strike', 'String', 'Sub', 'Sugar', 'Suit', 'Sumo', 'Sun', 'Superhero', 'Swamp', 'Sweat', 'Swing', 'Switch', 'Sword', 'System', 'Table', 'Tablet', 'Tag', 'Tail', 'Take', 'Tank', 'Tap', 'Taste', 'Tattoo', 'Tea', 'Teacher', 'Team', 'Tear', 'Telescope', 'Temple', 'Texas', 'Theater', 'Thief', 'Thumb', 'Thunder', 'Tick', 'Tie', 'Tiger', 'Time', 'Tin', 'Tip', 'Tipi', 'Toast', 'Tokyo', 'Tooth', 'Torch', 'Tornado', 'Tower', 'Track', 'Train', 'Triangle', 'Trick', 'Trip', 'Troll', 'Trunk', 'Tube', 'Tunnel', 'Turkey', 'Turn', 'Turtle', 'Tutu', 'Tuxedo', 'Undertaker', 'Unicorn', 'University', 'Vacuum', 'Valentine', 'Vampire', 'Van', 'Venus', 'Vet', 'Viking', 'Violet', 'Virus', 'Volcano', 'Volume', 'Wagon', 'Waitress', 'Wake', 'Wall', 'Walrus', 'War', 'Washer', 'Washington', 'Watch', 'Water', 'Wave', 'Way', 'Web', 'Wedding', 'Well', 'Werewolf', 'Whale', 'Wheel', 'Wheelchair', 'Whip', 'Whistle', 'Wind', 'Window', 'Wing', 'Wish', 'Witch', 'Wizard', 'Wonderland', 'Wood', 'Wool', 'Worm', 'Yard', 'Yellowstone', 'Zombie'];

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