var express = require('express');
const passport = require('passport');
const router = express.Router();
const teamsCtrl = require('../controllers/teams');
const isLoggedIn = require('../config/auth')

/* GET my team page. */
router.get('/', isLoggedIn, teamsCtrl.index);

router.get('/new', isLoggedIn,teamsCtrl.new);
router.get('/new/:team', isLoggedIn,teamsCtrl.new1);
router.get('/new/:team/:player', isLoggedIn,teamsCtrl.new);




router.post('/', isLoggedIn, teamsCtrl.create);

module.exports = router;
