// import all models
const List = require('./List');
const User = require('./User');
const Game = require('./Game');

// create associations
User.hasMany(List, {
  foreignKey: 'user_id'
});

List.belongsTo(User, {
  foreignKey: 'user_id'
});



Game.belongsTo(User, {
  foreignKey: 'user_id'
});

Game.belongsTo(List, {
  foreignKey: 'list_id'
});

User.hasMany(Game, {
  foreignKey: 'user_id'
});

List.hasMany(Game, {
  foreignKey: 'list_id'
});

module.exports = { User, List, Game };