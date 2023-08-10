const Genre = require('../models/genre');
const asyncHandler = require('express-async-handler');

exports.genre_list = asyncHandler(async (req, res, next) => {
    const allGenres = await Genre.find().sort({ name: 1 }).exec();

    res.render("genre_list", { title: "Genre List", genre_list: allGenres });
})

exports.genre_detail = asyncHandler(async (req, res, next) => {
    res.send(`TO DO: Genre Detail: ${req.params.id}`);;
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