const Game = require('../models/game');
const Developer = require('../models/developer');
const Genre = require('../models/genre');
const Platform = require('../models/platform');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler (async(req, res, next) => {
    const [
        numGames,
        numDevelopers,
        numGenres,
        numPlatforms
    ] = await Promise.all([
        Game.countDocuments({}).exec(),
        Developer.countDocuments({}).exec(),
        Genre.countDocuments({}).exec(),
        Platform.countDocuments({}).exec()
    ])

    res.render('collection', {
        title: "Collection",
        game_count: numGames,
        developer_count: numDevelopers,
        genre_count: numGenres,
        platform_count: numPlatforms
    })
})