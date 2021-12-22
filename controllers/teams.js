const Team = require('../models/team')
const User = require('../models/user')
const fetch = require('node-fetch');
const moment = require('moment');

const playersURL = 'https://www.balldontlie.io/api/v1/players?per_page=100';
const teamsURL = 'https://www.balldontlie.io/api/v1/teams?seasons[]=2021';
const gamesURL = 'https://www.balldontlie.io/api/v1/games?seasons[]=2021&start_date[]=2021-12-01&per_page=100';
const statsURL = 'https://www.balldontlie.io/api/v1/stats?seasons[]=2021&per_page=100'

module.exports = {
    index,
    new: newTeam,
    new1,
    new2,
    addToTeam,
    create,
};


async function index(req, res) {
    const teams = req.user.teams;

    //  teams = await User.teams.find({});
    res.render("teams/index", { title: "My Teams", teams });
}


async function newTeam(req, res) {
    const teams = await onLoadTeams();
    
    res.render("teams/new", { title: "NBA Draft Day", teamSelected:false, nameSelected:false});
}

async function create(req, res) {
    const teams = await onLoadTeams();
    Team.create(req.body, function (err) {
        res.render('teams/new', {title: "NBA Draft Day", nameSelected:true, teamSelected:false, name:req.body, teams } );
    });
}

async function new1(req, res) {
    const teams = await onLoadTeams();

    res.render("teams/new", { title: "NBA Draft Day", teams, teamSelected: true, nameSelected:true});
}
async function new2(req, res) {
    let players = [];
    const teams = await playerTeamMatcher();
    console.log('reqId', req.params.team);
    players = teams.data[req.params.team-1].players;
     console.log(players);
    res.render('teams/new', { title: "NBA Draft Day", teams, teamSelected: true, players});
}



async function addToTeam(req, res) {
   Teams
    req.params.team
    req.params.player
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


async function onLoadPlayers(req, res) {
    let playerId;
    let endProduct = [];

    const response = await fetch(`${playersURL}`)
        .then(response => response.json())
        .then(function (playerData) {
            endProduct = playerData;
        })
    return endProduct;
}


async function playerTeamMatcher(req, res) {
    let gameIdArray = [];
    let endProduct = [];
    let statsData = [];
    const teams = await onLoadTeams();
    const response = await fetch(`${gamesURL}`)
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
            let gameSlice = gamesDataSorted.slice((gamesDataSorted.length - 17), gamesDataSorted.length)
            gameSlice.forEach(function (game) {
                gameIdArray.push(game.id);
            });
            console.log("GIA", gameIdArray[0]);
            return gameIdArray;
        })
        .then(async function () {
            const results = await Promise.all([

                await fetch(`${statsURL}&game_ids[]=${gameIdArray[0]}&game_ids[]=${gameIdArray[1]}&game_ids[]=${gameIdArray[2]}&game_ids[]=${gameIdArray[3]}&game_ids[]=${gameIdArray[4]}&game_ids[]=${gameIdArray[5]}&game_ids[]=${gameIdArray[6]}&game_ids[]=${gameIdArray[7]}&game_ids[]=${gameIdArray[8]}&game_ids[]=${gameIdArray[9]}&game_ids[]=${gameIdArray[10]}&game_ids[]=${gameIdArray[11]}&game_ids[]=${gameIdArray[12]}&game_ids[]=${gameIdArray[13]}&game_ids[]=${gameIdArray[14]}&game_ids[]=${gameIdArray[15]}&game_ids[]=${gameIdArray[16]}&game_ids[]=${gameIdArray[17]}&page=1`)
                .then(response => response.json())
                .then(function(data) {
                 statsData.push(...data.data);
                }),


                await fetch(`${statsURL}&game_ids[]=${gameIdArray[0]}&game_ids[]=${gameIdArray[1]}&game_ids[]=${gameIdArray[2]}&game_ids[]=${gameIdArray[3]}&game_ids[]=${gameIdArray[4]}&game_ids[]=${gameIdArray[5]}&game_ids[]=${gameIdArray[6]}&game_ids[]=${gameIdArray[7]}&game_ids[]=${gameIdArray[8]}&game_ids[]=${gameIdArray[9]}&game_ids[]=${gameIdArray[10]}&game_ids[]=${gameIdArray[11]}&game_ids[]=${gameIdArray[12]}&game_ids[]=${gameIdArray[13]}&game_ids[]=${gameIdArray[14]}&game_ids[]=${gameIdArray[15]}&game_ids[]=${gameIdArray[16]}&game_ids[]=${gameIdArray[17]}&page=2`)
                .then(response => response.json())
                .then(function(data) {
                    statsData.push(...data.data);
                }),

                await fetch(`${statsURL}&game_ids[]=${gameIdArray[0]}&game_ids[]=${gameIdArray[1]}&game_ids[]=${gameIdArray[2]}&game_ids[]=${gameIdArray[3]}&game_ids[]=${gameIdArray[4]}&game_ids[]=${gameIdArray[5]}&game_ids[]=${gameIdArray[6]}&game_ids[]=${gameIdArray[7]}&game_ids[]=${gameIdArray[8]}&game_ids[]=${gameIdArray[9]}&game_ids[]=${gameIdArray[10]}&game_ids[]=${gameIdArray[11]}&game_ids[]=${gameIdArray[12]}&game_ids[]=${gameIdArray[13]}&game_ids[]=${gameIdArray[14]}&game_ids[]=${gameIdArray[15]}&game_ids[]=${gameIdArray[16]}&game_ids[]=${gameIdArray[17]}&page=3`)
                .then(response => response.json())
                .then(function(data) {
                    statsData.push(...data.data);
                }),

                await fetch(`${statsURL}&game_ids[]=${gameIdArray[0]}&game_ids[]=${gameIdArray[1]}&game_ids[]=${gameIdArray[2]}&game_ids[]=${gameIdArray[3]}&game_ids[]=${gameIdArray[4]}&game_ids[]=${gameIdArray[5]}&game_ids[]=${gameIdArray[6]}&game_ids[]=${gameIdArray[7]}&game_ids[]=${gameIdArray[8]}&game_ids[]=${gameIdArray[9]}&game_ids[]=${gameIdArray[10]}&game_ids[]=${gameIdArray[11]}&game_ids[]=${gameIdArray[12]}&game_ids[]=${gameIdArray[13]}&game_ids[]=${gameIdArray[14]}&game_ids[]=${gameIdArray[15]}&game_ids[]=${gameIdArray[16]}&game_ids[]=${gameIdArray[17]}&page=4`).then(response => response.json())
                .then(function(data) {
                    statsData.push(...data.data);
                }),
                await fetch(`${statsURL}&game_ids[]=${gameIdArray[0]}&game_ids[]=${gameIdArray[1]}&game_ids[]=${gameIdArray[2]}&game_ids[]=${gameIdArray[3]}&game_ids[]=${gameIdArray[4]}&game_ids[]=${gameIdArray[5]}&game_ids[]=${gameIdArray[6]}&game_ids[]=${gameIdArray[7]}&game_ids[]=${gameIdArray[8]}&game_ids[]=${gameIdArray[9]}&game_ids[]=${gameIdArray[10]}&game_ids[]=${gameIdArray[11]}&game_ids[]=${gameIdArray[12]}&game_ids[]=${gameIdArray[13]}&game_ids[]=${gameIdArray[14]}&game_ids[]=${gameIdArray[15]}&game_ids[]=${gameIdArray[16]}&game_ids[]=${gameIdArray[17]}&page=5`)
                .then(response => response.json())
                .then(function(data) {
                    statsData.push(...data.data);
                })
            ]);
                return statsData;
            })
            .then(function (statsData) {
            teams.data.forEach(function (team) {
                team.players = [];
                statsData.forEach(function (stat) {
                    if (team.id === stat.player.team_id) {
                        team.players.push(stat.player);
                    };
                });
                return teams;
            })
        })
        console.log("teams", teams);
        return teams;
}

