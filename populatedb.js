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
        platformCreate(5, "Nintendo"),
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
            10,
            developers[0],
            [platforms[0], platforms[1], platforms[2], platforms[3], platforms[4]],
            [genres[0], genres[3], genres[5], genres[6], genres[7]],
            "image"
        ),
        gameCreate(1,
            "Minecraft",
            "2011-11-18",
            "----- description -----",
            29.99,
            2,
            "developer",
            "platform",
            "genre",
            "image"
        ),
        gameCreate(2,
            "name",
            "release_date",
            "----- description -----",
            "price",
            "number_in_stock",
            "developer",
            "platform",
            "genre",
            "image"
        ),
        gameCreate(3,
            "name",
            "release_date",
            "----- description -----",
            "price",
            "number_in_stock",
            "developer",
            "platform",
            "genre",
            "image"
        ),
        gameCreate(4,
            "name",
            "release_date",
            "----- description -----",
            "price",
            "number_in_stock",
            "developer",
            "platform",
            "genre",
            "image"
        ),
        gameCreate(5,
            "name",
            "release_date",
            "----- description -----",
            "price",
            "number_in_stock",
            "developer",
            "platform",
            "genre",
            "image"
        ),
        gameCreate(6,
            "name",
            "release_date",
            "----- description -----",
            "price",
            "number_in_stock",
            "developer",
            "platform",
            "genre",
            "image"
        ),
    ]);
}