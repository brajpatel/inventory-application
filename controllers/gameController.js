const { body, validationResult } = require("express-validator");
const Game = require('../models/game');
const Developer = require('../models/developer');
const Platform = require('../models/platform');
const Genre = require('../models/genre');
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const upload = multer({ dest: './public/images'})

exports.game_list = asyncHandler(async (req, res, next) => {
    const allGames = await Game.find({}, "name developer image")
        .sort({ name: 1 })
        .populate("developer")
        .exec();

    res.render("game_list", { title: "Game List", game_list: allGames });
})

exports.game_detail = asyncHandler(async (req, res, next) => {
    const game = await Game.findById(req.params.id)
        .populate("developer")
        .populate("genre")
        .populate("platform")
        .exec();

    if(!game) {
        const err = new Error("Game not found");
        err.status = 404;
        return next(err);
    }

    res.render("game_detail", { title: game.name, game: game });
})

exports.game_create_get = asyncHandler(async (req, res, next) => {
    const [allDevelopers, allPlatforms, allGenres] = await Promise.all([
        Developer.find().exec(),
        Platform.find().exec(),
        Genre.find().exec()
    ])

    res.render("game_form", {
        title: "Create Game",
        developers: allDevelopers,
        platforms: allPlatforms,
        genres: allGenres
    });
})

exports.game_create_post = [
    (req, res, next) => {
      if(!(req.body.platform instanceof Array)) {
        if(typeof req.body.platform === "undefined") req.body.platform = [];
        else req.body.platform = new Array(req.body.platform)
      }  
    },
    (req, res, next) => {
      if(!(req.body.genre instanceof Array)) {
        if(typeof req.body.genre === "undefined") req.body.genre = [];
        else req.body.genre = new Array(req.body.genre)
      }  
    },
    body("name", "Game name must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    asyncHandler(async (req, res, next) => {
        
    })
]

exports.game_update_get = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Game Update GET");
})

exports.game_update_post = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Game Update POST");
})

exports.game_delete_get = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Game Delete GET");
})

exports.game_delete_post = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Game Delete POST");
})