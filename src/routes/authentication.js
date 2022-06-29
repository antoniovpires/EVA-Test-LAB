const express = require('express');
const router = express.Router();
const passport = require('passport');


// CADASTRO
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/products',
  failureRedirect: '/signup',
  failureFlash: true
}));

// LOGIN
router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
  req.check('email', 'Email is Required').notEmpty();
  req.check('password', 'Password is Required').notEmpty();
  if (req.validationErrors()) {
    req.flash('message', errors[0].msg);
    res.redirect('/signin');
  }
  passport.authenticate('local.signin', {
    successRedirect: '/products',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

// LOGOUT

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

module.exports = router;
