const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nbaTeamSchema = new Schema({
  abbreviation: String,
  city: String,
  conference: String,
  division: String,
  fullName: String,
  name: String,
  players: [{type: Schema.Types.ObjectId, ref: 'Player'}]
});

module.exports = mongoose.model('NbaTeam', nbaTeamSchema); 