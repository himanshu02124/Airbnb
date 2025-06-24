if(process.env.NODE_ENV != "production"){

  require("dotenv").config()
}
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const wrapAsync = require('./utils/wrapasync');
const ExpressError = require("./utils/expresserror.js");
const listing = require("./models/listing");
const Review = require("./models/review")
const session =require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")
const {isloggedin,isOwner,SaveRedirectUrl}= require("./middleware.js")

const dbURL = process.env.ATLASDB_URL


const app = express();

const sessionOptions ={
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxage:7*24*60*60*1000,
    httpOnly:true
  }
}

app.use(session(sessionOptions))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req,res,next)=>{
res.locals.success=req.flash("success")
res.locals.error=req.flash("error")
res.locals.currUser=req.user
next()
})

app.get("/demouser",async (req,res)=>{
let fakeuser = new User({
  email:"himanshu@gmail.com",
  username:"himu"
})
let registeredUser= await User.register(fakeuser,"helloworld")
res.send(registeredUser)
})


const listingRoutes = require("./routes/listing");
const reviewRoutes = require("./routes/review");
const userRouter = require("./routes/user")

// Database connection
async function main() {
  await mongoose.connect(dbURL);
}
main()
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', engine);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));
const {listingSchema,reviewSchema}=require("./listingSchema.js")




// middleware/validateListing.js

const { validateListing, validateReview } = require('./validateListing');


app.get("/", (req, res) => {
  res.redirect("/listing"); // or render a homepage if you have one
});



// Routes

// //Index route
// app.get("/listing", async (req, res) => {
//   const allListing = await listing.find({});
//   res.render("listing/index.ejs", { allListing });
// });

// // New listing form
// app.get("/listing/new", (req, res) => {
//   res.render("listing/new.ejs");
// });

// // // Create listing
// app.post("/listing",validateListing, wrapAsync(async (req, res) => {
//   if (!req.body.listing) {
//     throw new ExpressError(400, "No listing data provided");
//   }
//   const newListing = new listing(req.body.listing);
//   await newListing.save();
//   res.redirect("/listing");
// }));

// // // Show one listing
// app.get("/listing/:id", wrapAsync(async (req, res) => {
//   const { id } = req.params;
//  const foundListing = await listing.findById(id).populate("reviews")
//   if (!foundListing) {
//     throw new ExpressError(404, "Listing not found");
//   }
//   res.render("listing/show.ejs", { listing: foundListing });
// }));

// // // Edit listing form
// app.get("/listing/:id/edit",validateListing, wrapAsync(async (req, res) => {
//   const { id } = req.params;
//   const foundListing = await listing.findById(id);
//   res.render("listing/edit", { listing: foundListing });
// }));

// // // Update listing
// app.put("/listing/:id",validateListing, wrapAsync(async (req, res) => {
//   const { id } = req.params;
//   await listing.findByIdAndUpdate(id, { ...req.body.listing });
//   res.redirect(`/listing/${id}`);
// }));

// // // Delete listing
// app.delete("/listing/:id", wrapAsync(async (req, res) => {
//   const { id } = req.params;
//   await listing.findByIdAndDelete(id);
//   res.redirect("/listing");
// }));

// app.use("/listing",listing)

// app.post("/listing/:id/reviews",validateReview, async(req,res)=>{
//  const foundListing= await listing.findById(req.params.id)
//  console.log("Found Listing:", foundListing);
//  if (!foundListing) {
//     throw new ExpressError(404, "Listing not found");
//   }
//  const review = new Review(req.body.review)
//  foundListing.reviews.push(review)
//  await review.save();
//  await foundListing.save();
//  res.redirect(`/listing/${foundListing._id}`);
// })

// app.delete('/listing/:id/reviews/:reviewId', async (req, res) => {
//   const { id, reviewId } = req.params;

//   // Remove review from Review collection
//   await Review.findByIdAndDelete(reviewId);

//   // Remove reference of review from Listing
//   await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

//   res.redirect(`/listing/${id}`);
// });

// 404 handler
// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"));
// });

app.use("/listing", listingRoutes);           // /listing/*
app.use("/listing/:id/reviews", reviewRoutes); // nested route
app.use("/",userRouter)


// // General error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error", { err });
});

// // Start server
app.listen(8000, () => {
  console.log("Server running on port 8000");
});
