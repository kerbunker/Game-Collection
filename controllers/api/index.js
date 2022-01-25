const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const gameRoutes = require('./game-routes');
const listRoutes = require('./list-routes');
// if we have time to add comments to games
//const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
//router.use('/games', gameRoutes);
//router.use('/lists', listRoutes);

module.exports = router;