var express = require('express');
const passport = require('passport');
const router = express.Router();
const teamsCtrl = require('../controllers/teams');

/* GET my team page. */
router.get('/', teamsCtrl.index);




module.exports = router;
