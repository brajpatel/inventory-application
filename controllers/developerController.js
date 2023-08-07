const Developer = require('../models/developer');
const asyncHandler = require('express-async-handler');

exports.developer_list = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Developer List");
})

exports.developer_detail = asyncHandler(async (req, res, next) => {
    res.send(`TO DO: Developer Detail: ${req.params.id}`);;
})

exports.developer_create_get = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Developer Create GET");
})

exports.developer_create_post = asyncHandler(async (req, res, next) => {
    res.send("TO DO: Developer Create POST");
})

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