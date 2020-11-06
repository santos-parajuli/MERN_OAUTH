const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
module.exports = (userModel, passport) => {
    passport.use(new GoogleStrategy({
        clientID: keys.Google.GOOGLE_CLIENT_ID,
        clientSecret: keys.Google.GOOGLE_CLIENT_SECRET,
        callbackURL: keys.Google.CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
        userModel.findOne({
            'emailAddress': profile.emails[0].value
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, user);
            } else {
                // create the user
                var user = new userModel({
                    emailAddress: profile.emails[0].value,
                    password: 'none',
                    accountCreated: new Date(),
                    profile: {
                        name: profile.displayName || profile.emails[0].value,
                        avatarURL: profile.photos ? profile.photos[0].value : ''
                    },
                    accessToken:accessToken,
                    loginStrategy: 'google'
                });
                try {
                    user.save((err) => {
                        if (err) throw (err);
                        return done(null, user);
                    });
                } catch (err) {
                    console.error(err);
                    done(err);
                }
            }
        });
    }));
}