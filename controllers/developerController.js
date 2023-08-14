const { body, validationResult } = require("express-validator");
const Developer = require('../models/developer');
const Game = require('../models/game');
const asyncHandler = require('express-async-handler');

exports.developer_list = asyncHandler(async (req, res, next) => {
    const allDevelopers = await Developer.find().sort({ name: 1 }).exec();

    res.render("developer_list", { title: "Developer List", developer_list: allDevelopers });
})

exports.developer_detail = asyncHandler(async (req, res, next) => {
    const [developer, allGamesByDeveloper] = await Promise.all([
        Developer.findById(req.params.id).exec(),
        Game.find({ developer: req.params.id }, "name description image").exec()
    ]);

    if(!developer) {
        const err = new Error("Developer not found");
        err.status = 404;
        return next(err);
    }

    res.render("developer_detail", { title: developer.name, developer: developer, developer_games: allGamesByDeveloper });
})

exports.developer_create_get = asyncHandler(async (req, res, next) => {
    res.render("developer_form", { title: "Create Developer" });
})

exports.developer_create_post = [
    body("name", "Developer must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const developer = new Developer({ name: req.body.name });

        if(!errors.isEmpty()) {
            res.render("developer_form", {
                title: "Create Developer",
                developer: developer,
                errors: errors.array()
            });

            return;
        }
        else {
            const developerExists = await Developer.findOne({ name: req.body.name }).collation({ locale: "en", strength: 2 }).exec();

            if(developerExists) {
                res.redirect(developerExists.url);
            }
            else {
                await developer.save();
                res.redirect(developer.url);
            }
        }
    })
]

exports.developer_update_get = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Developer Update GET");
})

exports.developer_update_post = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Developer Update POST");
})

exports.developer_delete_get = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Developer Delete GET");
})

exports.developer_delete_post = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Developer Delete POST");
})