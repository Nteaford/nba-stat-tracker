const Game = require('../models/game')
const NbaTeam = require('../models/nbaTeam')
const Player = require('../models/player')
const Stat = require('../models/stat')
const User = require('../models/user')

module.exports = {
index,
};


async function index(req, res) {
    const teams = req.user.teams;
    //  teams = await User.teams.find({});
    res.render("teams/index", { title: "My Teams", teams });
}



