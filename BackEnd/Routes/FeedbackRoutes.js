const express = require("express");
const router = express.Router();
const Feedback = require("../Controllers/FeedbackController");

router.get("/", Feedback.getAllFeedbacks);
router.post("/", Feedback.addFeedbacks);
router.get("/:id", Feedback.getById);
router.put("/:id", Feedback.updateFeedback);
router.delete("/:id", Feedback.deleteFeedback);



module.exports = router;
