const Game = require('../models/game')
const NbaTeam = require('../models/nbaTeam')
const Player = require('../models/player')
const Stat = require('../models/stat')
const fetch = require('node-fetch');
const moment = require('moment');

const recentGamesURL = 'https://www.balldontlie.io/api/v1/games?seasons[]=2021';
const playersURL = 'https://www.balldontlie.io/api/v1/players';
const statsURL = 'https://www.balldontlie.io/api/v1/stats?seasons[]=2021';


module.exports = {
    onLoad,
};



async function onLoad(req, res) {
    const games = await onLoadGames();
    const playerOne = await onLoadPlayer('Stephen', 'Curry');
    const playerTwo = await onLoadPlayer('Kevin', 'Durant');
    const playerThree = await onLoadPlayer('James', 'Harden');
    const playerFour = await onLoadPlayer('Giannis', 'Antetokounmpo');
    const playerFive = await onLoadPlayer('Joel', 'Embiid');
    console.log(playerTwo);
    res.render('index', { title: "Welcome to NBA Stat Tracker", games, playerOne, playerTwo, playerThree, playerFour, playerFive }
    );
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
    const response = await fetch(recentGamesURL)
        .then(response => response.json())
        .then(function (gamesData) {
            let gamesDataSorted = gamesData.data.sort(function (gamesDatumA, gamesDatumB) {
                return (gamesDatumA.id - gamesDatumB.id);
            })
            let gameSlice = gamesDataSorted.slice((gamesDataSorted.length - 5), gamesDataSorted.length)
            finalProduct = gameSlice;
        });
    return finalProduct;
}





async function onLoadPlayer(first, last) {
    let playerStats;
    let playerId;
    let endProduct;
    console.log(first);
    console.log(last);

    const response = await fetch(`${playersURL}?search=${last}`)
        .then(response => response.json())
        .then(function (playerData) {
            console.log(playerData);
            let playerFilter = playerData.data.filter(function (playerDatum) {
                return (playerDatum.first_name === first && playerDatum.last_name === last);
            })
            playerId = playerFilter[0];
        })
        .then(async function () {
            await fetch(`${statsURL}&player_ids[]=${playerId.id}`)
                .then(response => response.json())
                .then(function (playerStatistics) {
                    let playerStatisticsSorted = playerStatistics.data.sort(function(playerStatisticA, playerStatisticB) {
                        return (playerStatisticA.id - playerStatisticB.id);
                        })
                        let statSlice = playerStatisticsSorted.slice((playerStatisticsSorted.length - 1), playerStatisticsSorted.length)
                        endProduct = statSlice;
                        // console.log('ep', endProduct); 
                    });
                    
                });
                return endProduct;  
                // console.log('end product', endProduct);
        }