var express = require('express');
const passport = require('passport');
const router = express.Router();
const indexesCtrl = require('../controllers/indexes');

/* GET home page. */
router.get('/', indexesCtrl.onLoadNbaTeams);




// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    //DO I WANT TO UPDATE THESE ROUTES LATER? WE'LL SEE IF THIS NOTE GOES AWAY
    successRedirect : '/',
    failureRedirect : '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
      //DO I WANT TO UPDATE THIS ROUTES LATER? WE'LL SEE IF THIS NOTE GOES AWAY
  res.redirect('/');
});


module.exports = router;
