const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/users.js");


router.get("/signup", userController.renderSignupForm);

router.get("/login", userController.renderLoginForm);

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", { 
    failureRedirect: "/login",
    failureFlash: true,
    }),
    userController.login);

router.post("/signup",saveRedirectUrl, wrapAsync(userController.signup));

router.get("/logout", userController.logout)

module.exports = router;