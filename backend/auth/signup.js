const bcrypt = require("bcryptjs");

module.exports = class {
    constructor(userModel){
        this.userModel = userModel;
    };
    signup(req, res, next){
        if(!req.body.password){
            return res.json({ success : false, message : 'Password is required' });
        }
            this.userModel.findOne({
                'emailAddress': req.body.email.toLowerCase()
            }, (err, user) => {
                if (err) {
                    return next(err);
                }
                if (user) {
                    return res.json({ success : false, message : 'Signup failed, email is already exist' });
                } else {
                    let password = req.body.password;
                    // create the user
                    bcrypt.genSalt(10, (err, salt) => {
                        if(err) return next(err);
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if(err) return next(err);
                            let user = new this.userModel({
                                    emailAddress: req.body.email.toLowerCase(),
                                    password: hash,
                                    accountCreated: new Date(),
                                    profile: {
                                        name: req.body.name,
                                        avatarURL: req.body.avatarURL || "https://i.imgur.com/vhdtevL.jpg"
                                    },
                                    loginStrategy: 'signin'
                            });
                            try {
                                user.save((err) => {
                                    if (err){
                                        return next(err);
                                    }else{
                                        const {emailAddress, profile, accountCreated, _id} = user;
                                        return res.json({emailAddress, profile, accountCreated,_id});
                                    };
                                });
                            } catch (err) {
                                return next(err);
                            }
                        });
                    });       
                }
            });
    }
};