require('dotenv').config();
require('./config/database');
const NBATeam = require('./models/nbaTeam')
const Player = require('./models/player')
const data = require('./data')

const p1 = NBATeam.deleteMany({});
const p2 = Player.deleteMany({});

Promise.all([p1, p2])
.then(function(results) {
  console.log(results);
  return Performer.create(data.performers);
}).then(function(performers) {
  console.log(performers);
  return Movie.create(data.movies);
}).then(function(movies) {
  console.log(movies);
  return Promise.all([
    Performer.findOne({ name: "Mark Hamill" }),
    Movie.findOne({ title: "Star Wars - A New Hope" }),
  ]);
}).then(function(results) {
  const mark = results[0];
  const starWars = results[1];
  starWars.cast.push(mark);
  return starWars.save();
}).then(function() {
  process.exit();
});