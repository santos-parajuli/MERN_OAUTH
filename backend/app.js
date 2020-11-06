const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
var cors = require('cors');
const SerialAuthenticator = require("./auth/index");
const app = express();

//cors allow
app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex : true, useFindAndModify : false}
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport config

// passport de/serialize and local strategy
SerialAuthenticator(passport);
const users = require("./routes/api/users");
const auth = require("./routes/api/auth")(passport);


// Routes
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
