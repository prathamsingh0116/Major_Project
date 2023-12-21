const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, validateReview,saveRedirectUrl} = require("../middleware.js");
const reviewController = require("../controller/reviews.js");






//Review
//post Route
router.post("/",
   isLoggedIn,
   validateReview, wrapAsync(reviewController.createReview));

//DELETE Route
router.delete("/:reviewId", isLoggedIn ,
    wrapAsync(reviewController.destroyReview));

module.exports = router;