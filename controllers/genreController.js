const { body, validationResult } = require("express-validator");
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

    res.render("genre_detail", {
        title: genre.name,
        genre: genre,
        genre_games: allGamesInGenre
    });
})

exports.genre_create_get = asyncHandler(async (req, res, next) => {
    res.render("genre_form", { title: "Create Genre" });
})

exports.genre_create_post = [
    body("name", "Genre name must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const genre = new Genre({ name: req.body.name });

        if(!errors.isEmpty()) {
            res.render("genre_form", {
                title: "Create Genre",
                genre: genre,
                errors: errors.array()
            });

            return;
        }
        else {
            const genreExists = await Genre.findOne({ name: req.body.name }).collation({ locale: 'en', strength: 2 }).exec();

            if(genreExists) {
                res.redirect(genreExists.url);
            }
            else {
                await genre.save();
                res.redirect(genre.url);
            }
        }
    })
]

exports.genre_update_get = asyncHandler(async (req, res, next) => {
    const genre = await Genre.findById(req.params.id).exec();

    if(!genre) {
        const err = new Error("Genre not found");
        err.status = 404;
        return next(err);
    }

    res.render("genre_form", {
        title: "Update Genre",
        genre: genre
    });
})

exports.genre_update_post = [
    body("name", "Genre name must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const genre = new Genre({
            name: req.body.name,
            _id: req.params.id
        })

        if(!errors.isEmpty()) {
            res.render("genre_form", {
                title: "Update Genre",
                genre: genre,
                errors: errors.array()
            });

            return;
        }
        else {
            const genreExists = await Genre.findOne({ name: req.body.name }).collation({ locale: 'en', strength: 2 }).exec();

            if(genreExists) {
                res.redirect(genreExists.url);
            }
            else {
                const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, genre, {});
                res.redirect(updatedGenre.url);
            }
        }
    })
]

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
    const [genre, allGamesInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Game.find({ genre: req.params.id }, "name description image").exec()
    ]);

    if(!genre) {
        res.redirect("/collection/genres");
    }

    res.render("genre_delete", {
        title: genre.name,
        genre: genre,
        genre_games: allGamesInGenre
    });
})

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
    const [genre, allGamesInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Game.find({ genre: req.params.id }, "name description image").exec()
    ]);

    if(allGamesInGenre.length > 0) {
        res.render("genre_delete", {
            title: genre.name,
            genre: genre,
            genre_games: allGamesInGenre
        });

        return;
    }
    else {
        await Genre.findByIdAndRemove(req.body.genreid);
        res.redirect("/collection/genres");
    }
})