const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  date: String,
  homeTeamScore: String,
  visitorTeamScore: String,
  season: String,
  postseason: String,
  homeTeam: {type: Schema.Types.ObjectId, ref: 'nbaTeam'},
  visitorTeam: {type: Schema.Types.ObjectId, ref: 'nbaTeam'},

});

module.exports = mongoose.model('Game', gameSchema);