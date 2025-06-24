const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync");
const ExpressError = require("../utils/expresserror");
const Listing = require("../models/listing");
const { validateListing } = require("../validateListing");
const { isloggedin, isOwner, SaveRedirectUrl } = require("../middleware");
const listingController = require("../controller/listing.js")

const multer = require('multer')
const { storage } = require("../cloudconfig.js")
const upload = multer({ storage })

// Corrected Routes

// Index
router.get("/", wrapAsync(listingController.index));

// new form
router.get("/new", isloggedin, listingController.rendernewForm);

// create 
router.post(
  "/",
  isloggedin,
  upload.single('listing[image]'),
//   validateListing,
  wrapAsync(listingController.Createnew)
);



// Show
router.get("/:id", wrapAsync(listingController.Showlisting));

// Edit
router.get("/:id/edit", isloggedin, isOwner, wrapAsync(listingController.Editlisting));

// Update
router.put("/:id", isloggedin, isOwner,  upload.single('listing[image]'), wrapAsync(listingController.Updatelisting));

// Delete
router.delete("/:id", isloggedin, wrapAsync(listingController.Destroy));

module.exports = router
