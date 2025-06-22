const express = require("express");
const router = express.Router();
const User = require("../models/user")
const passport = require("passport")
const {SaveRedirectUrl}=require("../middleware.js")

const Usercontroller=require("../controller/user");
const wrapasync = require("../utils/wrapasync.js");


router.get("/signup",Usercontroller.rendersignup)


router.post("/signup",wrapasync(Usercontroller.Signup));


router.get("/login",Usercontroller.renderlogin)

router.post("/login", SaveRedirectUrl,passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true
}),Usercontroller.login

)

router.get("/logout",Usercontroller.logout)

module.exports = router