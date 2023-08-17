const { body, validationResult } = require("express-validator");
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

exports.platform_create_post = [
    body("name", "Platform name must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const platform = new Platform({ name: req.body.name });

        if(!errors.isEmpty()) {
            res.render("genre_form", {
                title: "Create Platform",
                platform: platform,
                errors: errors.array()
            });

            return;
        }
        else {
            const platformExists = await Platform.findOne({ name: req.body.name }).collation({ locale: 'en', strength: 2 }).exec();

            if(platformExists) {
                res.redirect(platformExists.url);
            }
            else {
                await platform.save();
                res.redirect(platform.url);
            }
        }
    })
]

exports.platform_update_get = asyncHandler(async (req, res, next) => {
    const platform = await Platform.findById(req.params.id).exec();

    if(!platform) {
        const err = new Error("Platform not found");
        err.status = 404;
        return next(err);
    }

    res.render("platform_form", {
        title: "Update Platform",
        platform: platform
    })
})

exports.platform_update_post = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Platform Update POST");
})

exports.platform_delete_get = asyncHandler(async (req, res, next) => {
    const [platform, allGamesForPlatform] = await Promise.all([
        Platform.findById(req.params.id).exec(),
        Game.find({ platform: req.params.id }, "name description image").exec()
    ]);

    if(!platform) {
        res.redirect("/collection/platforms");
    }

    res.render("platform_delete", {
        title: platform.name,
        platform: platform,
        platform_games: allGamesForPlatform
    });
})

exports.platform_delete_post = asyncHandler(async (req, res, next) => {
    const [platform, allGamesForPlatform] = await Promise.all([
        Platform.findById(req.params.id).exec(),
        Game.find({ platform: req.params.id }, "name description image").exec()
    ]);

    if(allGamesForPlatform.length > 0) {
        res.render("platform_delete", {
            title: platform.name,
            platform: platform,
            platform_games: allGamesForPlatform
        });

        return;
    }
    else {
        await Platform.findByIdAndRemove(req.body.platformid);
        res.redirect("/collection/platforms");
    }
})