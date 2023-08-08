#! /usr/bin/env node

console.log('This script populates some test games, developers, genres and platforms to your database. Specified database as argument - e.g.: node populatedb <mongoDB URL>');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Game = require("./models/game");
const Developer = require("./models/developer");
const Genre = require("./models/genre");
const Platform = require("./models/platform");

const games = [];
const developers = [];
const genres = [];
const platforms = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createDevelopers();
    await createGenres();
    await createPlatforms();
    await createGames();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function gameCreate(index, name, release_date, description, price, number_in_stock, developer, platform, genre, image) {
    const gamedetail = {
        name: name,
        release_date: release_date,
        description: description,
        price: price,
        number_in_stock: number_in_stock,
        developer: developer,
        platform: platform,
        genre: genre,
        image: image,
    };

    if (genre != false) gamedetail.genre = genre;

    const game = new Game(gamedetail);
    await game.save();
    games[index] = game;
    console.log(`Added game: ${name}`);
}

async function developerCreate(index, name) {
    const developerdetail = { name: name };

    const developer = new Developer(developerdetail);

    await developer.save();
    developers[index] = developer;
    console.log(`Added developer: ${name}`);
}

async function genreCreate(index, name) {
    const genredetail = { name: name };

    const genre = new Genre(genredetail)
    await genre.save();
    genres[index] = genre;
    console.log(`Added genre: ${name}`);
}

async function platformCreate(index, name) {
    const platformdetail = { name: name };

    const platform = new Platform(platformdetail);
    await platform.save();
    platforms[index] = platform;
    console.log(`Added platform: ${name}`);
}

async function createDevelopers() {
    console.log("Adding developers");
    await Promise.all([
        developerCreate(0, "FromSoftware"),
        developerCreate(1, "Square Enix"),
        developerCreate(2, "Nintendo"),
        developerCreate(3, "Rockstar Games"),
        developerCreate(4, "Bethesda"),
        developerCreate(5, "Mojang"),
        developerCreate(6, "Ubisoft"),
        developerCreate(7, "Naughty Dog")
    ]);
}

async function createGenres() {
    console.log("Adding genres");
    await Promise.all([
        genreCreate(0, "Action"),
        genreCreate(1, "FPS"),
        genreCreate(2, "Survival"),
        genreCreate(3, "RPG"),
        genreCreate(4, "Puzzle"),
        genreCreate(5, "Adventure"),
        genreCreate(6, "Platform"),
        genreCreate(7, "Fighting"),
        genreCreate(8, "Sandbox")
    ]);
}

async function createPlatforms() {
    console.log("Adding platforms");
    await Promise.all([
        platformCreate(0, "Playstation 4"),
        platformCreate(1, "Playstation 5"),
        platformCreate(2, "Xbox One"),
        platformCreate(3, "Xbox Series X"),
        platformCreate(4, "Xbox Series S"),
        platformCreate(5, "Nintendo Switch"),
        platformCreate(6, "Steam"),
        platformCreate(7, "Microsoft Windows"),
    ]);
}

async function createGames() {
    console.log("Adding Books");
    await Promise.all([
        gameCreate(0,
            "Elden Ring",
            "2022-02-25",
            "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring. Ye dead who yet live, your grace long lost, follow the path to become Elden Lord and stand before the Elden Ring.",
            59.99,
            8,
            developers[0],
            [platforms[0], platforms[1], platforms[2], platforms[3], platforms[4]],
            [genres[0], genres[3], genres[5], genres[6], genres[7]],
            "image"
        ),
        gameCreate(1,
            "Minecraft",
            "2011-11-18",
            "Explore a blocky, three-dimensional world with virtually infinite terrain and discover and extract raw materials, craft tools, build structures, and fight against hostile mobs.",
            29.99,
            2,
            developers[5],
            [platforms[0], platforms[2], platforms[7]],
            [genres[2], genres[8]],
            "image"
        ),
        gameCreate(2,
            "The Last of Us: Part 2",
            "2020-06-19",
            "When a violent event disrupts that peace, Ellie embarks on a relentless journey to carry out justice and find closure. As she hunts those responsible one by one, she is confronted with the devastating physical and emotional repercussions of her actions.",
            38.99,
            4,
            developers[7],
            [platforms[0]],
            [genres[0], genres[2]],
            "image"
        ),
        gameCreate(3,
            "Red Dead Redemption 2",
            "2018-10-26",
            "America, 1899. The end of the Wild West era has begun. After a robbery goes badly wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee.As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.",
            64.99,
            7,
            developers[3],
            [platforms[0], platforms[2], platforms[7]],
            [genres[0], genres[5]],
            "image"
        ),
        gameCreate(4,
            "Sekiro: Shadows Die Twice",
            "2019-03-22",
            "Step into the role of a disgraced warrior brought back from the brink of death whose mission is to rescue his master and exact revenge on his arch nemesis.",
            59.99,
            9,
            developers[0],
            [platforms[0], platforms[2], platforms[7]],
            [genres[0], genres[5]],
            "image"
        ),
        gameCreate(5,
            "Assassin's Creed Odyssey",
            "2018-10-2",
            "Embark on an epic journey that takes you from your humble beginnings as an outcast Spartan mercenary to a legendary Greek hero. Form alliances, make enemies and encounter a whole cast of others who will impact your journey.",
            54.99,
            0,
            developers[6],
            [platforms[0], platforms[2], platforms[5], [platforms[7]]],
            [genres[0], genres[5], genres[7]],
            "image"
        ),
        gameCreate(6,
            "The Legend of Zelda: Tears of the Kingdom",
            "2023-05-12",
            "An epic adventure across the land and skies of Hyrule awaits you. Embark on a perilous quest to unravel the truth behind a cataclysmic event that has sent the kingdom into turmoil.",
            32.99,
            5,
            developers[2],
            [platforms[5]],
            [genres[0], genres[4], genres[5], genres[7]],
            "image"
        ),
    ]);
}