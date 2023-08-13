const Platform = require('../models/platform');
const Game = require('../models/game');
const asyncHandler = require('express-async-handler');

exports.platform_list = asyncHandler(async (req, res, next) => {
    const allPlatforms = await Platform.find().sort({ name: 1 }).exec();

    res.render("platform_list", { title: "Platform List", platform_list: allPlatforms });
})

exports.platform_detail = asyncHandler(async (req, res, next) => {
    const [platform, allGamesForPlatform] = await Promise.all([
        Platform.findById(req.params.id).exec(),
        Game.find({ platform: req.params.id }, "name description image").exec()
    ]);

    if(!platform) {
        const err = new Error("Platform found");
        err.status = 404;
        return next(err);
    }

    res.render("platform_detail", { title: platform.name, platform: platform, platform_games: allGamesForPlatform });
})

exports.platform_create_get = asyncHandler(async (req, res, next) => {
    res.render("platform_form", { title: "Create Platform" });
})

exports.platform_create_post = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Platform Create POST");
})

exports.platform_update_get = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Platform Update GET");
})

exports.platform_update_post = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Platform Update POST");
})

exports.platform_delete_get = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Platform Delete GET");
})

exports.platform_delete_post = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Platform Delete POST");
})