const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const listingController = require("../controller/listings.js")

const upload = multer({ storage })




//Index Route
router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new",isLoggedIn, (req, res) => {
  res.render("listings/create.ejs");
});

router.get("/hotels", wrapAsync((listingController.hotels)));


router.get("/mountains", wrapAsync((listingController.mountains)));



//Show Route
router.get("/:id", wrapAsync(listingController.show));

//Create Route 
router.post("/",isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createRoute));



//Edit And Update Route
router.get("/:id/edit", 
  isLoggedIn ,
  isOwner, 
  wrapAsync(listingController.edit));

router.put("/:id", isLoggedIn , upload.single("listing[image]"), validateListing, wrapAsync(listingController.update));



//Delete Route

router.delete("/:id", isLoggedIn,isOwner, wrapAsync(listingController.delete));

module.exports = router;