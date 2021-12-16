const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  date: Date,
  homeTeamScore: String,
  visitorTeamScore: String,
  season: Number,
  postseason: Boolean,
  homeTeam: {type: Schema.Types.ObjectId, ref: 'nbaTeam'},
  visitorTeam: {type: Schema.Types.ObjectId, ref: 'nbaTeam'},

});

module.exports = mongoose.model('Game', gameSchema);