const Listing=require("../models/listing")
const Review = require("../models/review")

module.exports.createReview=async (req, res) => {
  const foundListing = await Listing.findById(req.params.id);
  if (!foundListing) throw new ExpressError(404, "Listing not found");
  const review = new Review(req.body.review);
  review.author=req.user._id
  console.log(review)
  foundListing.reviews.push(review);
  await review.save();
  await foundListing.save();
  req.flash("success","new review created")
  res.redirect(`/listing/${foundListing._id}`);
}


module.exports.Deletereview=async (req, res) => {
  const { id, reviewId } = req.params;
  await Review.findByIdAndDelete(reviewId);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  req.flash("success","review deleted")
  res.redirect(`/listing/${id}`);
}