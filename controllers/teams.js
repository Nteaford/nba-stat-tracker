const Team = require('../models/team')
const User = require('../models/user')
const fetch = require('node-fetch');
const moment = require('moment');

const playersURL = 'https://www.balldontlie.io/api/v1/players';
const teamsURL = 'https://www.balldontlie.io/api/v1/teams?seasons[]=2021';

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
   const teams = await onLoadTeams();
console.log(teams);
    //  teams = await User.teams.find({});
    res.render("teams/new", { title: "NBA Draft Day", teams});
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



async function onLoadTeams(req, res) {
    let finalProduct;
    const response = await fetch(teamsURL)
    .then(response => response.json())
    .then(function (teamsData) {
        
            finalProduct = teamsData;
        });
    return finalProduct;
}

async function teamToPlayerPG(req, res) {
    
    let playerId;
    let endProduct = [];
    
    const response = await fetch(`${playersURL}`)
    .then(response => response.json())
    .then(function (playerData) {
        let playerFilter = playerData.data.filter(function (playerDatum) {
            return (playerDatum.team.id === req.body && playerDatum.position === "PG");
            })
            endProduct = playerFilter;
        })
        return endProduct;  
    }
