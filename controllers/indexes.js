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
    // const stats = await onLoadStats();
    console.log(games);
    res.render('index', {title: "Welcome to NBA Stat Tracker", 
    // nbaTeams, 
    // players, 
    games 
    // stats
});
}


// async function onLoadGames(req, res) {
//     let finalProduct;
//     const response = await fetch('https://www.balldontlie.io/api/v1/games?seasons[]=2021')
//     .then(response => response.json())
//     .then(function(gamesData) {
//         console.log(gamesData);
//         let dateRangeStart = moment().format();
//         let dateRangeEnd = moment().subtract(5, 'days').format();
//         let gamesDataFiltered = gamesData.data.filter(function(gamesDatum) {
//             return (new Date(gamesDatum.date) <= new Date(dateRangeStart) && new Date(gamesDatum.date) >= new Date(dateRangeEnd));
//         })
//         console.log(gamesDataFiltered);
//         finalProduct = gamesDataFiltered;
//     });
//     return finalProduct;


// async function onLoadStats(req, res) {
//     let finalProduct;
//     const response = await fetch('https://www.balldontlie.io/api/v1/stats')
//     .then(response => response.json())
//     .then(function(statsData) {
//         console.log(statsData);
//         let statsDataSorted = statsData.data.sort(function(statsDatumA, statsDatumB) {
//             return (statsDatumA.id - statsDatumB.id);
//         })
//         console.log(statsDataSorted);
//         finalProduct = statsDataSorted;
//     });
//     return finalProduct;

    async function onLoadGames(req, res) {
    let finalProduct;
    const response = await fetch('https://www.balldontlie.io/api/v1/games?seasons[]=2021')
    .then(response => response.json())
    .then(function(gamesData) {
        let gamesDataSorted = gamesData.data.sort(function(gamesDatumA, gamesDatumB) {
            return (gamesDatumA.id - gamesDatumB.id);
        })
        let gameSlice = gamesDataSorted.slice((gamesDataSorted.length-5), gamesDataSorted.length)
        finalProduct = gameSlice;
    });
    return finalProduct;
}

