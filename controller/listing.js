const Listing = require("../models/listing")

module.exports.index=async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listing/index.ejs", { allListing });
}

module.exports.rendernewForm=(req, res) => {
  res.render("listing/new.ejs");
}

module.exports.Createnew=(async (req, res) => {
  if (!req.body.listing) throw new ExpressError(400, "No listing data provided");
  let url=req.file.path;
  let filename=req.file.filename;
  const newListing = new Listing(req.body.listing);
  console.log(req.user)
  newListing.owner=req.user._id;
  newListing.image={url,filename}
  await newListing.save();
  req.flash("success","new listing created")
  res.redirect("/listing");
})

module.exports.Showlisting=(async (req, res) => {
  const foundListing = await Listing.findById(req.params.id).populate("reviews").populate("owner");
  if (!foundListing) throw new ExpressError(404, "Listing not found");
  res.render("listing/show.ejs", { listing: foundListing ,currUser: req.user});
})

module.exports.Editlisting=(async (req, res) => {
  const foundListing = await Listing.findById(req.params.id);
  res.render("listing/edit.ejs", { listing: foundListing });
})

module.exports.Updatelisting=(async (req, res) => {
  let listing =await Listing.findByIdAndUpdate(req.params.id, { ...req.body.listing });
  if(req.file){
  let url =req.file.path;
  let filename=req.file.filename
  listing.image={url,filename}
}
  await listing.save()
  
  req.flash("success","new listing updated")
  res.redirect(`/listing/${req.params.id}`);
})

module.exports.Destroy=(async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success"," listing deleted")
  res.redirect("/listing");
})