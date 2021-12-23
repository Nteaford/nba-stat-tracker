require('dotenv').config();
require('./config/database');
const Player = require('./models/player')
const Team = require('./models/team')
const data = require('./data')

const p1 = Player.deleteMany({});
const p2 = Team.deleteMany({});

Promise.all([p1, p2])
.then(function(results) {
  console.log(results);
  return Player.create(data.players);
}).then(function(players) {
  console.log(players);
  process.exit();
});