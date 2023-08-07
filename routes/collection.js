const express = require('express');
const router = express.Router();

const game_controller = require('../controllers/gameController');
const developer_controller = require('../controllers/developerController');
const genre_controller = require('../controllers/genreController');
const platformController = require('../controllers/platformController');

// COLLECTION ROUTE
router.get('/', function(req, res, next) {
  res.render('collection', { title: 'Collection' });
});

// GAME ROUTES
router.get('/games', game_controller.game_list);

router.get('/game/:id', game_controller.game_detail);

router.get('/game/create', game_controller.game_create_get);

router.post('/game/create', game_controller.game_create_post);

router.get('/game/update', game_controller.game_update_get);

router.post('/game/update', game_controller.game_update_post);

router.get('/game/delete', game_controller.game_delete_get);

router.post('/game/delete', game_controller.game_delete_post);

// DEVELOPER ROUTES
router.get('/developers', developer_controller.developer_list);

router.get('/developer/:id', developer_controller.developer_detail);

router.get('/developer/create', developer_controller.developer_create_get);

router.post('/developer/create', developer_controller.developer_create_post);

router.get('/developer/update', developer_controller.developer_update_get);

router.post('/developer/update', developer_controller.developer_update_post);

router.get('/developer/delete', developer_controller.developer_delete_get);

router.post('/developer/delete', developer_controller.developer_delete_post);

// GENRE ROUTES
router.get('/genres', genre_controller.genre_list);

router.get('/genre/:id', genre_controller.genre_detail);

router.get('/genre/create', genre_controller.genre_create_get);

router.post('/genre/create', genre_controller.genre_create_post);

router.get('/genre/update', genre_controller.genre_update_get);

router.post('/genre/update', genre_controller.genre_update_post);

router.get('/genre/delete', genre_controller.genre_delete_get);

router.post('/genre/delete', genre_controller.genre_delete_post);

// PLATFORM ROUTES
router.get('/platforms', platform_controller.platform_list);

router.get('/platform/:id', platform_controller.platform_detail);

router.get('/platform/create', platform_controller.platform_create_get);

router.post('/platform/create', platform_controller.platform_create_post);

router.get('/platform/update', platform_controller.platform_update_get);

router.post('/platform/update', platform_controller.platform_update_post);

router.get('/platform/delete', platform_controller.platform_delete_get);

router.post('/platform/delete', platform_controller.platform_delete_post);

module.exports = router;
