const Team = require('../models/team')
const User = require('../models/user')
const fetch = require('node-fetch');
const moment = require('moment');

const recentGamesURL = 'https://www.balldontlie.io/api/v1/games?seasons[]=2021';
const playersURL = 'https://www.balldontlie.io/api/v1/players';
const statsURL = 'https://www.balldontlie.io/api/v1/stats?seasons[]=2021';
const teamsURL = 'https://www.balldontlie.io/api/v1/teams?seasons[]=2021';


module.exports = {
    onLoad,
};



async function onLoad(req, res) {
    const results = await Promise.all([
      onLoadGames(),
      onLoadTeams(),
      onLoadPlayer('Stephen', 'Curry'),
      onLoadPlayer('Kevin', 'Durant'),
      onLoadPlayer('James', 'Harden'),
      onLoadPlayer('Giannis', 'Antetokounmpo'),
      onLoadPlayer('Joel', 'Embiid'),
    ]);
    const games = results[0];
    const teams = results[1];
    const playerOne = results[2];
    const playerTwo = results[3];
    const playerThree = results[4];
    const playerFour = results[5];
    const playerFive = results[6];
    res.render('index', { title: "the NBA Stat Tracker", games, teams, playerOne, playerTwo, playerThree, playerFour, playerFive});
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

async function onLoadGames(req, res) {
    let finalProduct;
    const response = await fetch(`${recentGamesURL}`)
        .then(response => response.json())
        .then(function (gamesData) {
            gamesData.data.forEach(function (game) {
                game.date = new Date(game.date);
            })
            return gamesData;
        })
        .then(function (gamesDataUpdated) {
            let gamesDataSorted = gamesDataUpdated.data.sort(function (gamesDatumA, gamesDatumB) {
                return (gamesDatumA.date - gamesDatumB.date);
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
    
    const response = await fetch(`${playersURL}?search=${last}`)
    .then(response => response.json())
    .then(function (playerData) {
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
    }
