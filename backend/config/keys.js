module.exports = {
  Google : {
    GOOGLE_CLIENT_ID:"848109427768-07922480e55s4v5no58avduu3and33j7.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET:"RWPP3JZbx2J53JbEL3xy2yzk",
		CALLBACK_URL: "http://localhost:5000/api/auth/google/callback"
  },
  Facebook:{
    APP_ID:"313676810052865",
    APP_SECRET:"fae191baa37153ce8d83e14c1ca8a5d4",
    callbackURL: "http://localhost:5000/api/auth/facebook/callback"
  },
  mongoURI: "mongodb+srv://santos_parajuli:sasi987@nodejs.uhjwr.mongodb.net/test?retryWrites=true&w=majority",
  secretOrKey: "secret",
  SESSION_SECRET:"verysecret",
  FACEBOOK_APP_ID:"",
  FACEBOOK_APP_SECRET:"",
};
