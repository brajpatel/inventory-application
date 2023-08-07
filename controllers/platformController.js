const Platform = require('../models/platform');
const asyncHandler = require('express-async-handler');

exports.platform_list = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Platform List");
})

exports.platform_detail = asyncHandler(async (req, res, next) => {
    res.send(`TO DO: Platform Detail: ${req.params.id}`);;
})

exports.platform_create_get = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Platform Create GET");
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