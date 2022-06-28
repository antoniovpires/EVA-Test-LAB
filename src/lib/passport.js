const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helpers = require('./helpers');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


// SIGN-IN SECTION

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await prisma.users.findMany({
      where: {
          email: username,
      },
    });
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (!validPassword) {
      done(null, false, req.flash('message', 'Senha Incorreta'));
    }
  } else {
    return done(null, false, req.flash('message', 'Esse email não está cadastrado!'));
  }
}));


// SIGN-UP SECTION

passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  req.body.password = await helpers.encryptPassword(password);
  // Saving in the Database
  const newUser = await prisma.users.create({
    data: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password 
    }
  })
  return done(null, newUser.id);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

