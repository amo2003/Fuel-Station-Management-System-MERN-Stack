const Rating = require("../Models/Rating");

// Add a new rating
const addRating = async (req, res) => {
  try {
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const newRating = new Rating({ rating });
    await newRating.save();

    res.status(201).json({ message: "Rating saved successfully" });
  } catch (err) {
    console.error("Rating Error:", err.message);
    res.status(500).json({ error: "Failed to save rating" });
  }
};

// GET: All ratings 
const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ date: -1 });
    res.status(200).json(ratings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
};

//delete
const deleteRating = async (req, res) => {
  try {
    const id = req.params.id;
    await Rating.findByIdAndDelete(id);
    res.json({ message: "rating deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting rating" });
  }
};


module.exports = { 
    addRating, 
    getAllRatings,
    deleteRating 
};
