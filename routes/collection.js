const express = require('express');
const router = express.Router();

const collection_controller = require('../controllers/collectionController');
const game_controller = require('../controllers/gameController');
const developer_controller = require('../controllers/developerController');
const genre_controller = require('../controllers/genreController');
const platform_controller = require('../controllers/platformController');

// COLLECTION ROUTE
router.get('/', collection_controller.index);

// GAME ROUTES
router.get('/games', game_controller.game_list);

router.get('/game/:id', game_controller.game_detail);

router.get('/game/create', game_controller.game_create_get);

router.post('/game/create', game_controller.game_create_post);

router.get('/game/:id/update', game_controller.game_update_get);

router.post('/game/:id/update', game_controller.game_update_post);

router.get('/game/:id/delete', game_controller.game_delete_get);

router.post('/game/:id/delete', game_controller.game_delete_post);

// DEVELOPER ROUTES
router.get('/developers', developer_controller.developer_list);

router.get('/developer/:id', developer_controller.developer_detail);

router.get('/developer/create', developer_controller.developer_create_get);

router.post('/developer/create', developer_controller.developer_create_post);

router.get('/developer/:id/update', developer_controller.developer_update_get);

router.post('/developer/:id/update', developer_controller.developer_update_post);

router.get('/developer/:id/delete', developer_controller.developer_delete_get);

router.post('/developer/:id/delete', developer_controller.developer_delete_post);

// GENRE ROUTES
router.get('/genres', genre_controller.genre_list);

router.get('/genre/:id', genre_controller.genre_detail);

router.get('/genre/create', genre_controller.genre_create_get);

router.post('/genre/create', genre_controller.genre_create_post);

router.get('/genre/:id/update', genre_controller.genre_update_get);

router.post('/genre/:id/update', genre_controller.genre_update_post);

router.get('/genre/:id/delete', genre_controller.genre_delete_get);

router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// PLATFORM ROUTES
router.get('/platforms', platform_controller.platform_list);

router.get('/platform/:id', platform_controller.platform_detail);

router.get('/platform/create', platform_controller.platform_create_get);

router.post('/platform/create', platform_controller.platform_create_post);

router.get('/platform/:id/update', platform_controller.platform_update_get);

router.post('/platform/:id/update', platform_controller.platform_update_post);

router.get('/platform/:id/delete', platform_controller.platform_delete_get);

router.post('/platform/:id/delete', platform_controller.platform_delete_post);

module.exports = router;
