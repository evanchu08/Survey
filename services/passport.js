const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
})

passport.use(
    new GoogleStrategy({
        clientID: process.env.googleClientID,
        clientSecret: process.env.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            const existUser = await User.findOne({ googleId: profile.id });
            if (existUser) {
                return done(null, existUser);
            }
            const user = await User({ googleId: profile.id }).save();
            return done(null, user);
        })
);
