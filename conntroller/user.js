const Listing=require("../models/listing")
const Review = require("../models/review")
const User=require("../models/user")

module.exports.rendersignup=(req,res)=>{
    res.render("user/signup.ejs")
}

module.exports.Signup=async(req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Signed up successfully!");
            res.redirect("/listing");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderlogin=(req,res)=>{
    res.render("user/login.ejs")
}

module.exports.login=async (req,res)=>{
    req.flash("success","loggied in successfully")
    const redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl)
}

module.exports.logout=(req,res,)=>{
    req.logout((err)=>{
        if(err){
          return  next(err)
        }
        req.flash("success","logout successfully")
        res.redirect("/listing")
    })
}