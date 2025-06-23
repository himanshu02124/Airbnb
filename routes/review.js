const express = require("express");
const router = express.Router({ mergeParams: true }); // allow access to :id
const Listing = require("../models/listing");
const Review = require("../models/review");
const { validateReview } = require("../validatelisting");
const ExpressError = require("../utils/expresserror");

const reviewController = require("../controller/review")

// Create Review
router.post("/", validateReview, reviewController.createReview);

// Delete Review
router.delete("/:reviewId", reviewController.Deletereview);

module.exports = router;
