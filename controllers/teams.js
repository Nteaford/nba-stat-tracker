const Team = require('../models/team')
const User = require('../models/user')
const fetch = require('node-fetch');
const moment = require('moment');

const playersURL = 'https://www.balldontlie.io/api/v1/players?per_page=100';
const nbaTeamsURL = 'https://www.balldontlie.io/api/v1/teams?seasons[]=2021';
const gamesURL = 'https://www.balldontlie.io/api/v1/games?seasons[]=2021&start_date[]=2021-12-01&per_page=100';
const statsURL = 'https://www.balldontlie.io/api/v1/stats?seasons[]=2021&per_page=100'

module.exports = {
    index,
    new: newTeamNaming,
    playerSelectionTeam,
    addToTeam,
    createTeam,
    show,
};


async function index(req, res) {
    const teams = await Team.find({});
   await teams.forEach(function(team) {
        players.forEach(async function (player) {
            await fetch(`${statsURL}&player_ids[]=${player}`)
            .then(response => response.json())
            .then(function (playerStatistics) {
                playerStatistics.data.forEach(function (stat) {
                    stat.date = new Date(stat.date);
                })
                return playerStatistics;
            })
            .then(function (playerStatisticsUpdated) {

                let playerStatisticsSorted = playerStatistics.data.sort(function (playerStatisticA, playerStatisticB) {
                    return (playerStatisticA.date - playerStatisticB.date);
                })
                let statSlice = playerStatisticsSorted.slice((playerStatisticsSorted.length - 3), playerStatisticsSorted.length)
                player.statArray = statSlice;
            });
        return player.statArray;
    });
    })
res.render("teams/index", { title: "My Teams", teams });
}


async function newTeamNaming(req, res) {
    const nbaTeams = await onLoadNBATeams();

    res.render("teams/new", { title: "NBA Draft Day", nbaTeamSelected: false, nameSelected: false, playerSelected: false, });
}

async function createTeam(req, res) {
    const nbaTeams = await onLoadNBATeams();
    const team = new Team(req.body);
    team.user = req.user._id;
    team.save(function (err) {
        if (err) {
            console.log(err);
            return res.redirect("/teams/new")
        }
        res.render(`teams/new`, { title: "NBA Draft Day", nameSelected: true, nbaTeamSelected: false, playerSelected: false, team, nbaTeams });
    });
}


async function playerSelectionTeam(req, res) {
    let players = [];
    const nbaTeams = await playerNBATeamMatcher();
    console.log('reqId', req.params.nbaTeam);
    players = nbaTeams.data[req.params.nbaTeam - 1].players;
    console.log(players);
    Team.findById(req.params.team).exec(function (err, team) {
        res.render('teams/new', { title: "NBA Draft Day", nbaTeams, nameSelected: true, nbaTeamSelected: true, playerSelected: false, players, team });
    })
}



async function addToTeam(req, res) {
    const nbaTeams = await onLoadNBATeams();
    Team.findById(req.params.team).exec(function (err, team) {
        team.players.push(req.params.player);
        team.save(function (err) {
            // one way to handle errors
            if (err) {
                console.log(err);
                return res.redirect("/teams/new");
            }
            console.log(team);
            res.redirect(`/teams/new`);
        });
        res.render(`teams/new`, { title: "NBA Draft Day", nameSelected: true, nbaTeamSelected: false, playerSelected: false, team, nbaTeams });
    })
}


async function show(req, res) {
    nbaTeams = onLoadNBATeams();
    Team.findById(req.params.team).exec(function (err, team) {
        team.players.forEach(async function (player) {
            await fetch(`${statsURL}&player_ids[]=${player}`)
                .then(response => response.json())
                .then(function (playerStatistics) {
                    playerStatistics.data.forEach(function (stat) {
                        stat.date = new Date(stat.date);
                    })
                    return playerStatistics;
                })
                .then(function (playerStatisticsUpdated) {

                    let playerStatisticsSorted = playerStatistics.data.sort(function (playerStatisticA, playerStatisticB) {
                        return (playerStatisticA.date - playerStatisticB.date);
                    })
                    let statSlice = playerStatisticsSorted.slice((playerStatisticsSorted.length - 3), playerStatisticsSorted.length)
                    player.statArray = statSlice;
                });
            return player.statArray;
        });

        console.log("statArray", team.players[0].statArray)
        console.log("team", team)
        res.render(`teams/show`, { team, statsArray, nbaTeams });

    })
}




async function onLoadNBATeams(req, res) {
    let finalProduct;
    const response = await fetch(nbaTeamsURL)
        .then(response => response.json())
        .then(function (nbaTeamsData) {
            finalProduct = nbaTeamsData;
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


async function playerNBATeamMatcher(req, res) {
    let gameIdArray = [];
    let endProduct = [];
    let statsData = [];
    const nbaTeams = await onLoadNBATeams();
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
                    .then(function (data) {
                        statsData.push(...data.data);
                    }),


                await fetch(`${statsURL}&game_ids[]=${gameIdArray[0]}&game_ids[]=${gameIdArray[1]}&game_ids[]=${gameIdArray[2]}&game_ids[]=${gameIdArray[3]}&game_ids[]=${gameIdArray[4]}&game_ids[]=${gameIdArray[5]}&game_ids[]=${gameIdArray[6]}&game_ids[]=${gameIdArray[7]}&game_ids[]=${gameIdArray[8]}&game_ids[]=${gameIdArray[9]}&game_ids[]=${gameIdArray[10]}&game_ids[]=${gameIdArray[11]}&game_ids[]=${gameIdArray[12]}&game_ids[]=${gameIdArray[13]}&game_ids[]=${gameIdArray[14]}&game_ids[]=${gameIdArray[15]}&game_ids[]=${gameIdArray[16]}&game_ids[]=${gameIdArray[17]}&page=2`)
                    .then(response => response.json())
                    .then(function (data) {
                        statsData.push(...data.data);
                    }),

                await fetch(`${statsURL}&game_ids[]=${gameIdArray[0]}&game_ids[]=${gameIdArray[1]}&game_ids[]=${gameIdArray[2]}&game_ids[]=${gameIdArray[3]}&game_ids[]=${gameIdArray[4]}&game_ids[]=${gameIdArray[5]}&game_ids[]=${gameIdArray[6]}&game_ids[]=${gameIdArray[7]}&game_ids[]=${gameIdArray[8]}&game_ids[]=${gameIdArray[9]}&game_ids[]=${gameIdArray[10]}&game_ids[]=${gameIdArray[11]}&game_ids[]=${gameIdArray[12]}&game_ids[]=${gameIdArray[13]}&game_ids[]=${gameIdArray[14]}&game_ids[]=${gameIdArray[15]}&game_ids[]=${gameIdArray[16]}&game_ids[]=${gameIdArray[17]}&page=3`)
                    .then(response => response.json())
                    .then(function (data) {
                        statsData.push(...data.data);
                    }),

                await fetch(`${statsURL}&game_ids[]=${gameIdArray[0]}&game_ids[]=${gameIdArray[1]}&game_ids[]=${gameIdArray[2]}&game_ids[]=${gameIdArray[3]}&game_ids[]=${gameIdArray[4]}&game_ids[]=${gameIdArray[5]}&game_ids[]=${gameIdArray[6]}&game_ids[]=${gameIdArray[7]}&game_ids[]=${gameIdArray[8]}&game_ids[]=${gameIdArray[9]}&game_ids[]=${gameIdArray[10]}&game_ids[]=${gameIdArray[11]}&game_ids[]=${gameIdArray[12]}&game_ids[]=${gameIdArray[13]}&game_ids[]=${gameIdArray[14]}&game_ids[]=${gameIdArray[15]}&game_ids[]=${gameIdArray[16]}&game_ids[]=${gameIdArray[17]}&page=4`).then(response => response.json())
                    .then(function (data) {
                        statsData.push(...data.data);
                    }),
                await fetch(`${statsURL}&game_ids[]=${gameIdArray[0]}&game_ids[]=${gameIdArray[1]}&game_ids[]=${gameIdArray[2]}&game_ids[]=${gameIdArray[3]}&game_ids[]=${gameIdArray[4]}&game_ids[]=${gameIdArray[5]}&game_ids[]=${gameIdArray[6]}&game_ids[]=${gameIdArray[7]}&game_ids[]=${gameIdArray[8]}&game_ids[]=${gameIdArray[9]}&game_ids[]=${gameIdArray[10]}&game_ids[]=${gameIdArray[11]}&game_ids[]=${gameIdArray[12]}&game_ids[]=${gameIdArray[13]}&game_ids[]=${gameIdArray[14]}&game_ids[]=${gameIdArray[15]}&game_ids[]=${gameIdArray[16]}&game_ids[]=${gameIdArray[17]}&page=5`)
                    .then(response => response.json())
                    .then(function (data) {
                        statsData.push(...data.data);
                    })
            ]);
            return statsData;
        })
        .then(function (statsData) {
            nbaTeams.data.forEach(function (nbaTeam) {
                nbaTeam.players = [];
                statsData.forEach(function (stat) {
                    if (nbaTeam.id === stat.player.team_id) {
                        nbaTeam.players.push(stat.player);
                    };
                });
                return nbaTeams;
            })
        })
    console.log("nbaTeams", nbaTeams);
    return nbaTeams;
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
                    let playerStatisticsSorted = playerStatistics.data.sort(function (playerStatisticA, playerStatisticB) {
                        return (playerStatisticA.id - playerStatisticB.id);
                    })
                    let statSlice = playerStatisticsSorted.slice((playerStatisticsSorted.length - 1), playerStatisticsSorted.length)
                    endProduct = statSlice;
                    // console.log('ep', endProduct); 
                });

        });
    return endProduct;
}