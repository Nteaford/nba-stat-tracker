const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: String,
    players: [{type: String}],
    user: {type: Schema.Types.ObjectId, ref: 'User'}
  });

module.exports = mongoose.model('Team', teamSchema);