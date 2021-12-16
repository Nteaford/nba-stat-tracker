const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  firstName: String,
  lastName: String,
  position: String,
  heightFeet: Number,
  heightInches: Number,
  weightPounds: Number,
  nbaTeam:{
    type: [{type: Schema.Types.ObjectId, ref: 'nbaTeam'}],
},
  
});

module.exports = mongoose.model('Player', playerSchema);