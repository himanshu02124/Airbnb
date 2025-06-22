const Listing = require("./models/listing")

module.exports.isloggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl
        req.flash("error","something is wrong")
       return res.redirect("/login")
    }
    next()
}

module.exports.SaveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}

module.exports.isOwner= async (req,res,next)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
  if (!listing.owner.equals(req.user._id)) {
        req.flash("error","you are not the owner")
        return res.redirect(`/listing/${id}`)
    }
    next()
}