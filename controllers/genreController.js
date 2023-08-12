const Genre = require('../models/genre');
const Game = require('../models/game');
const asyncHandler = require('express-async-handler');

exports.genre_list = asyncHandler(async (req, res, next) => {
    const allGenres = await Genre.find().sort({ name: 1 }).exec();

    res.render("genre_list", { title: "Genre List", genre_list: allGenres });
})

exports.genre_detail = asyncHandler(async (req, res, next) => {
    const [genre, allGamesInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Game.find({ genre: req.params.id }, "name description image").exec()
    ]);

    if(!genre) {
        const err = new Error("Genre not found");
        err.status = 404;
        return next(err);
    }

    res.render("genre_detail", { title: genre.name, genre: genre, genre_games: allGamesInGenre });
})

exports.genre_create_get = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Genre Create GET");
})

exports.genre_create_post = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Genre Create POST");
})

exports.genre_update_get = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Genre Update GET");
})

exports.genre_update_post = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Genre Update POST");
})

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Genre Delete GET");
})

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Genre Delete POST");
})