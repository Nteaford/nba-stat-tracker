var express = require('express');
const passport = require('passport');
const router = express.Router();
const teamsCtrl = require('../controllers/teams');
const isLoggedIn = require('../config/auth')

router.get('/', isLoggedIn, teamsCtrl.index);
router.post('/', isLoggedIn, teamsCtrl.create);
router.get('/new', isLoggedIn, teamsCtrl.new);
router.delete('/:id', isLoggedIn, teamsCtrl.delete);
router.get('/:id', isLoggedIn, teamsCtrl.show)
router.get('/:id/edit', isLoggedIn, teamsCtrl.edit);
router.put('/:id/', isLoggedIn, teamsCtrl.update);

module.exports = router;
