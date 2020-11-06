const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const Signup = require('../../auth/signup');
const Signin = require('../../auth/signin');
const User = require("../../models/User");
const signup = new Signup(User);
const signin = new Signin(User);

module.exports = (passport)=>{
    router.post('/signin', signin.signin.bind(signin));

    router.post('/signup', signup.signup.bind(signup));

    router.get('/google', passport.authenticate('google', {scope: ['email']}));

    router.get('/google/callback',passport.authenticate('google', {failureRedirect: '/auth/login'}),(req, res) => {
        const payload = { id: req.user.id,avatarURL: req.user.profile.avatarURL,name: req.user.profile.name,email:req.user.emailAddress,contacts:req.user.contacts};
        jwt.sign(payload,keys.secretOrKey,{expiresIn: 31556926},
        (err, token) => {
            res.redirect("http://localhost:3000/token/"+token)
        }
        );
    });
    router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

    router.get('/facebook/callback',passport.authenticate('facebook', {failureRedirect: '/auth/login'}),(req, res) => {
        const payload = { id: req.user.id,avatarURL: req.user.profile.avatarURL,name: req.user.profile.name,email:req.user.emailAddress,contacts:req.user.contacts};
        jwt.sign(payload,keys.secretOrKey,{expiresIn: 31556926},
        (err, token) => {
            res.redirect("http://localhost:3000/token/"+token)
        }
        );
    });
    return router
}

