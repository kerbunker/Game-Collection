const User = require('./User');
const Game = require('./Game');
const List = require('./List');

User.hasMany(List, {
  foreignKey: 'user_id'
});

List.belongsTo(User, {
  foreignKey: 'user_id'
});

Game.belongsTo(List, {
  foreignKey: 'post_id'
});

List.hasMany(Game, {
  foreignKey: 'list_id'
});

module.exports = { User, List, Game };