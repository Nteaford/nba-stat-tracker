const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statSchema = new Schema({
  ast: Number,
  blk: Number,
  dReb: Number,
  fg3Pct: Number,
  fg3A: Number,
  fg3M: Number,
  fgPct: Number,
  fgA: Number,
  fgM: Number,
  ftA: Number,
  ftM: Number,
  ftPct: Number,
  game:{type: Schema.Types.ObjectId, ref: 'Game'},
  min: String,
  oReb: Number,
  //personal fouls
  pF: Number,
  player:{type: Schema.Types.ObjectId, ref: 'Player'},
  pts: Number,
  reb: Number,
  stl: Number,
  nbaTeam:{type: Schema.Types.ObjectId, ref: 'nbaTeam'},
  
});

module.exports = mongoose.model('Stat', statSchema);