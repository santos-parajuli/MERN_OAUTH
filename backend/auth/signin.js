const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretOrKey } = require('../config/keys');
const keys = require('../config/keys');

module.exports = class {
  constructor(User){
      this.User = User;
  };
	signin(req, res, next){
    User.findOne({'emailAddress' : req.body.email.toLowerCase()},(err,user) => {
      if (err) return res.json ({ message : err });
      if (!user) return res.status(400).json({ email: "Email not found" }); 
      bcrypt.compare(req.body.password, user.password, (err, result)=>{
         if (err) { return done(err); }
         if(result === true){
            let {emailAddress, profile, accountCreated, _id, contact} = user;
            let name = profile.name;
            let avatarURL=profile.avatarURL
            let token = jwt.sign(
                        {emailAddress, name ,accountCreated , _id, avatarURL, contact},
                        secretOrKey, 
                        { expiresIn: 365 * 24 * 60 * 60 }); 
            this.User.findOneAndUpdate({_id: _id},
                  {
                    $set:{
                      accessToken:token
                    }
                  }, {upsert: true, new: true}, (err, user)=>{
                          if(err || !user) return next(err);
                          else next();
            });
          res.json({success: true,token: "Bearer " + token});
         }else{
           return  res.status(400).json({ password: "Password incorrect" });
         }
      });     
    });
    }
} 



