const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  firstName: String,
  lastName: String,
  position: String,
  heightFeet: String,
  heightInches: String,
  weightPounds: String,
  team_id

});

module.exports = mongoose.model('Player', playerSchema); 