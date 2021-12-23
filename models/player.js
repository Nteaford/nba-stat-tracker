const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    first_name:String,
    last_name:String,
    position:String,
    height_feet: Number,
    height_inches: Number,
    weight_pounds: Number,
    team:{
      abbreviation: String,
      city: String,
      conference: String,
      division:String,
      full_name:String,
      name:String
    }
  });



module.exports = mongoose.model('Player', playerSchema);