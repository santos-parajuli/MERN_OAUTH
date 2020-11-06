const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');

module.exports = (userModel, passport)=>{
	passport.use(new FacebookStrategy({
			clientID: keys.Facebook.APP_ID,
			clientSecret: keys.Facebook.APP_SECRET,
			callbackURL: keys.Facebook.callbackURL,
			profileFields: ['id', 'displayName', 'photos', 'email']
		}, (accessToken, refreshToken, profile, done)=>{
			userModel.findOne({
                'emailAddress': profile._json.email
            }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, user);
                } else {
                    // create the user
                    var user = new userModel({
                        emailAddress: profile._json.email,
                        accountCreated: new Date(),
                        profile: {
                            name: profile.displayName,
                            avatarURL: profile.photos?profile.photos[0].value: ''
                        },
                        loginStrategy: 'facebook'
                    });
                    try {
                        user.save((err) => {
                            if (err) throw (err);
                            console.log('User is created');    
                            return done(null, user);
                        });
                    } catch (err) {
                        console.log(err);
                        return done(err);
                    }
                }
            });

		}
	));
}