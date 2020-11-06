const User = require("../models/User");
const authStrategies = {
//   github : require('./github'),
//   twitter: require('./twitter'),
  facebook : require('./facebook'),
  google: require('./google')
};

module.exports = (passport)=>{
  // serialize sessions
  passport.serializeUser((user, done)=>{
    done(null, user.id)
  });

  passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
      done(err, user)
    })
  });

// use these strategies

//   authStrategies.github(User, passport);
//   authStrategies.twitter(User, passport);
  authStrategies.facebook(User, passport);
  authStrategies.google(User, passport);
};