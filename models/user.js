const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: String,
  players: [{ type: Schema.Types.ObjectId, ref: 'Player'}],
});


const userSchema = new Schema({
  name: String,
  googleId: {
    type: String,
    required: true
  },
  email: String,
  avatar: String,
  teams: {type: [teamSchema]},
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);