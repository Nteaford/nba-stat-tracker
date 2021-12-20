const Team = require('../models/team')
const User = require('../models/user')
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = {
index,
new: newTeam,
create,
};


async function index(req, res) {
    const teams = req.user.teams;

    //  teams = await User.teams.find({});
    res.render("teams/index", { title: "My Teams", teams });
}


async function newTeam(req, res) {
    const teams = req.user.teams;

    //  teams = await User.teams.find({});
    res.render("teams/new", { title: "Pick your Teams"});
}


async function create(req, res) {
    const teams = req.user.teams;
    let newTeam = new Team(req.body);
    req.user.team.push(newTeam);
    user.save(function(err) {
        console.log(newTeam)
        res.redirect(`/teams/${user._id}`);
    });
}




