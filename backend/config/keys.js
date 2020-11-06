module.exports = {
  Google : {
    GOOGLE_CLIENT_ID:"Your google client id",
    GOOGLE_CLIENT_SECRET:"your google client secret",
		CALLBACK_URL: "http://localhost:5000/api/auth/google/callback"
  },
  Facebook:{
    APP_ID:"Your facebook app id",
    APP_SECRET:"your facebook app secret",
    callbackURL: "http://localhost:5000/api/auth/facebook/callback"
  },
  mongoURI: "Your mongo uri",
  secretOrKey: "your secret",
  SESSION_SECRET:"your session secret",
  FACEBOOK_APP_ID:"",
  FACEBOOK_APP_SECRET:"",
};
