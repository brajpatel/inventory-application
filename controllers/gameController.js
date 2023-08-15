const { body, validationResult } = require("express-validator");
const Game = require('../models/game');
const Developer = require('../models/developer');
const Platform = require('../models/platform');
const Genre = require('../models/genre');
const asyncHandler = require('express-async-handler');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

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
    upload.single("game_image"),
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
    body("description", "Game description must contain at least 20 characters")
        .trim()
        .isLength({ min: 20 })
        .escape(),
    body("price", "Price must be a value greater than or equal to 0")
        .trim()
        .escape(),
    body("number_in_stock", "Number in stock must be a value greater than or equal to 0")
        .trim()
        .escape(),
    body("initial_release_date", "Initial release date must not be empty")
        .optional({ values: "falsy" })
        .isISO8601()
        .toDate()
        .escape(),
    body("developer", "A developer must be selected")
        .trim()
        .escape(),
    body("platform.*")
        .escape(),
    body("genre.*")
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const game = new Game({
            name: req.body.name,
            release_date: req.body.release_date,
            description: req.body.description,
            price: req.body.price,
            number_in_stock: req.body.number_in_stock,
            developer: req.body.developer,
            platform: req.body.platform,
            genre: req.body.genre,
            image: { data: req.file.filename, contentType: 'image/png' }
        })

        if(!errors.isEmpty()) {
            const [allDevelopers, allPlatforms, allGenres] = await Promise.all([
                Developer.find().exec(),
                Platform.find().exec(),
                Genre.find().exec()
            ])
            
            for(const platform of allPlatforms) {
                if(game.platform.indexOf(platform._id) > -1) {
                    platform.checked = "true";
                }
            }

            for(const genre of allGenres) {
                if(game.genre.indexOf(genre._id) > -1) {
                    genre.checked = "true";
                }
            }

            res.render("game_form", {
                title: "Create Game",
                game: game,
                developers: allDevelopers,
                platforms: allPlatforms,
                genres: allGenres,
                errors: errors.array()
            });
        }
        
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