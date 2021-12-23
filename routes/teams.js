var express = require('express');
const passport = require('passport');
const router = express.Router();
const teamsCtrl = require('../controllers/teams');
const isLoggedIn = require('../config/auth')

/* GET my team page. */
router.get('/', isLoggedIn, teamsCtrl.index);
router.post('/', isLoggedIn, teamsCtrl.create);
router.get('/new', isLoggedIn,teamsCtrl.new);

router.get('/:id', isLoggedIn, teamsCtrl.show)

module.exports = router;
