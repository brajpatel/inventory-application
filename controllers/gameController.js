const Game = require('../models/game');
const asyncHandler = require('express-async-handler');

exports.game_list = asyncHandler(async (req, res, next) => {
    const allGames = await Game.find({}, "name developer image")
        .sort({ name: 1 })
        .populate("developer")
        .exec();

    res.render("game_list", { title: "Game List", game_list: allGames });
})

exports.game_detail = asyncHandler(async (req, res, next) => {
    const game = await Game.findById(req.params.id).exec();

    if(!game) {
        const err = new Error("Game not found");
        err.status = 404;
        return next(err);
    }

    res.render("game_detail", { title: game.name, game: game });
})

exports.game_create_get = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Game Create GET");
})

exports.game_create_post = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Game Create POST");
})

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