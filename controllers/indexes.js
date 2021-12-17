const Game = require('../models/game')
const NbaTeam = require('../models/nbaTeam')
const Player = require('../models/player')
const Stat = require('../models/stat')
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = {
onLoad,
};



async function onLoad(req, res) {
    // const nbaTeams = await onLoadNbaTeams();
    // const players = await onLoadPlayers();
    const games = await onLoadGames();
    console.log(games);
    // const stats = await onLoadStats();
    res.render('index', {title: "Welcome to NBA Stat Tracker", 
    // nbaTeams, 
    // players, 
    games 
    // stats
});
}

//  async function onLoadNbaTeams(req, res) {
//     const response = await fetch('https://www.balldontlie.io/api/v1/teams')
//     .then(response => response.json())
//     .then(function(nbaTeamData) {
//         return nbaTeamData;
//     })

    

//     // .then (console.log(response));
// }

// function onLoadPlayers(req, res) {
//     const response = fetch('https://www.balldontlie.io/api/v1/players')
//     .then(response => response.json())
//     .then (function(Data) {
//         return
//     }
//     );
// }
async function onLoadGames(req, res) {
    let finalProduct;
    const response = await fetch('https://www.balldontlie.io/api/v1/games?seasons[]=2021')
    .then(response => response.json())
    .then(function(gamesData) {
        console.log(gamesData.data);
        let dateRangeStart = moment().format();
        let dateRangeEnd = moment().subtract(5, 'days').format();
        let gamesDataFiltered = gamesData.data.filter(function(gamesDatum) {
            return (new Date(gamesDatum.date) <= new Date(dateRangeStart) && new Date(gamesDatum.date) >= new Date(dateRangeEnd));
        })
        console.log(gamesDataFiltered);
        finalProduct = gamesDataFiltered;
    });
    return finalProduct;
}
// function onLoadStats(req, res) {
//     const response = fetch('https://www.balldontlie.io/api/v1/stats?seasons[]=2021')
//     .then(response => response.json())
//     .then (function(Data)
//     );
// }
