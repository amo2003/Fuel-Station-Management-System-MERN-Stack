const express = require("express");
const router = express.Router();
const Rating = require("../Controllers/Rating");

router.get("/all", Rating.getAllRatings);
router.post("/add", Rating.addRating);
router.delete("/delete/:id", Rating.deleteRating);


module.exports = router;
