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

// GENRE ROUTES

// PLATFORM ROUTES

module.exports = router;
