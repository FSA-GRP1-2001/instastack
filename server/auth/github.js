const router = require('express').Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { User } = require('../db/models');
module.exports = router;

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  console.log('Github client ID/ secret not found. Skipping Github OAuth');
} else {
  const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK,
    scope: ['user:email'],
  };

  const strategy = new GitHubStrategy(
    githubConfig,
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      User.findOrCreate({
        where: { githubId: profile.id },
        defaults: { email: profile.emails[0].value },
      })
        .then(([user]) => done(null, user))
        .catch(done);
    }
  );

  passport.use(strategy);

  router.get(
    '/',
    passport.authenticate('github', { scope: ['user:email', 'profile'] })
  );

  router.get(
    '/callback',
    passport.authenticate('github', {
      successRedirect: '',
      failureRedirect: '/login',
    })
  );
}
