const User = require("../models/user.js");
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/users.js");


module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs")
}


module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs")
}

module.exports.login = async(req,res) =>{
    req.flash("success","Welcome back to Wanderlust! You are Logged In");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username })
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
               return next(err);
            }
            req.flash("success", "you are Logged In");
            let redirectUrl = res.locals.redirectUrl || "/listings"
            res.redirect(redirectUrl);
 
        });
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
           return next(err);
        }
        req.flash("error", "you are logged out");
        res.redirect("/listings")
    })
}