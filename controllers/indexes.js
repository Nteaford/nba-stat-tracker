const Game = require('../models/game')
const NbaTeam = require('../models/nbaTeam')
const Player = require('../models/player')
const Stat = require('../models/stat')

module.exports = {
onLoadNbaTeams,
};



function onLoad(req, res) {

}

 function onLoadNbaTeams(req, res) {
    console.log('test');
    // const response = fetch('https://www.balldontlie.io/api/v1/teams')
    // .then(response => response.json())
    // .then (data =>console.log(data));
    res.render('index', {title: "Welcome to NBA Stat Tracker"});
}
  







function onLoadPlayers(req, res) {

}
function onLoadGames(req, res) {

}
function onLoadStats(req, res) {

}
