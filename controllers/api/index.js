const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const gameRoutes = require('./game-routes');
const listRoutes = require('./list-routes');

// directs to routes for the user, lists, and games
router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/lists', listRoutes);

module.exports = router;