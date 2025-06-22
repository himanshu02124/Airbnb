const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const wrapAsync = require("./utils/wrapasync.js");
const ExpressError = require("./utils/expresserror.js");
const listing = require("./models/listing");

const app = express();

// Database connection
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');
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

// Routes - Properly ordered
app.get("/listing", async (req, res) => {
  const allListing = await listing.find({});
  res.render("listing/index.ejs", { allListing });
});

app.get("/listing/new", (req, res) => {
  res.render("listing/new.ejs");
});

app.post("/listing", wrapAsync(async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "No listing data provided");
  }
  const newListing = new listing(req.body.listing);
  await newListing.save();
  res.redirect("/listing");
}));

// Show route should come after new route
app.get("/listing/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const foundListing = await listing.findById(id);
  if (!foundListing) {
    throw new ExpressError(404, "Listing not found");
  }
  res.render("listing/show.ejs", { listing: foundListing });
}));

app.get("/listing/:id/edit", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const foundListing = await listing.findById(id);
  if (!foundListing) {
    throw new ExpressError(404, "Listing not found");
  }
  res.render("listing/edit", { listing: foundListing });
}));

app.put("/listing/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  await listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listing/${id}`);
}));

app.delete("/listing/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  await listing.findByIdAndDelete(id);
  res.redirect("/listing");
}));

// Single error handler at the end
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  // Consistent error response - choose either render or send
  res.status(statusCode).render("error", { err });
  // OR: res.status(statusCode).send({ error: message });
});

// Single server listen at the end
app.listen(8000, () => {
  console.log("Server running on port 8000");
});