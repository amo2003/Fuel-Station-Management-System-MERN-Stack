const Feedback = require("../Models/Feedback");

const addFeedbacks = async (req, res) => {
  const { name, gmail, section, contact, message, date } = req.body;

  try {
    const newFeedback = new Feedback({
      name,
      gmail,
      section,
      contact,
      message,
      date,
    });

    await newFeedback.save();
    return res.status(201).json({ feedback: newFeedback });
  } catch (err) {
    console.error("Add feedback error:", err);
    return res.status(500).json({ message: "Unable to add feedback" });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    if (!feedbacks || feedbacks.length === 0) {
      return res.status(404).json({ message: "No feedbacks found" });
    }

    return res.status(200).json({ feedbacks });
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ message: "Error retrieving feedbacks" });
  }
};


const getById = async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({ message: "feedback not found" });
    }

    return res.status(200).json({ feedback });
  } catch (err) {
    console.error("Get by ID error:", err);
    return res.status(500).json({ message: "Error fetching feedback" });
  }
};


const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { name, gmail, section, contact, message, date } = req.body;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { name, gmail, section, contact, message, date },
      { new: true, runValidators: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: "feedback not found" });
    }

    return res.status(200).json({ member: updatedFeedback });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ message: "Unable to update feedback" });
  }
};

const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({ message: "feedback not found" });
    }

    return res.status(200).json({ message: "feedback deleted", feedback });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ message: "Unable to delete feedback" });
  }
};


exports.getAllFeedbacks = getAllFeedbacks;
exports.getById = getById;
exports.addFeedbacks = addFeedbacks;
exports.updateFeedback = updateFeedback;
exports.deleteFeedback = deleteFeedback;