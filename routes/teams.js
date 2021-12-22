var express = require('express');
const passport = require('passport');
const router = express.Router();
const teamsCtrl = require('../controllers/teams');
const isLoggedIn = require('../config/auth')

/* GET my team page. */
router.get('/', isLoggedIn, teamsCtrl.index);
router.post('/create', isLoggedIn, teamsCtrl.createTeam);
router.get('/new', isLoggedIn,teamsCtrl.new);

router.get('/new/:team/:nbaTeam', isLoggedIn,teamsCtrl.playerSelectionTeam);
router.get('/new/:team/:nbaTeam/:player', isLoggedIn,teamsCtrl.addToTeam);





module.exports = router;
