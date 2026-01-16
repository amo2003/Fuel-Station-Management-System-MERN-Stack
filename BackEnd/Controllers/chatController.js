const ChatMessage = require("../Models/ChatMessage");
const ChatPin = require("../Models/ChatPin");


// Generate a new unique 4-digit PIN
exports.generatePin = async (req, res) => {
  try {
    let pin;
    let exists = true;

    // Ensure unique PIN
    while (exists) {
      pin = Math.floor(1000 + Math.random() * 9000).toString();
      exists = await ChatPin.findOne({ pin });
    }

    // Save to DB
    const newPin = new ChatPin({ pin });
    await newPin.save();

    res.status(200).json({ success: true, pin });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Check if a PIN exists
exports.checkPin = async (req, res) => {
  try {
    const pinExists = await ChatPin.findOne({ pin: req.params.pin });
    if (pinExists) {
      res.status(200).json({ success: true, message: "PIN exists" });
    } else {
      res.status(404).json({ success: false, message: "PIN not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- MESSAGES ----------------

// Send a message (customer or admin)
exports.sendMessage = async (req, res) => {
  try {
    const { sender, message, pin } = req.body;
    if (!pin)
      return res
        .status(400)
        .json({ success: false, message: "PIN is required" });

    const newMessage = new ChatMessage({ sender, message, pin });
    await newMessage.save();

    res.status(201).json({ success: true, data: newMessage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all messages for a specific PIN
exports.getMessagesByPin = async (req, res) => {
  try {
    const { pin } = req.params;
    const messages = await ChatMessage.find({ pin }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all unique customer PINs with unread counts
exports.getPins = async (req, res) => {
  try {
    const pins = await ChatMessage.aggregate([
      {
        $group: {
          _id: "$pin",
          unread: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$seen", false] },
                    { $eq: ["$sender", "customer"] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: pins.map((p) => ({
        pin: p._id,
        unread: p.unread,
      })),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get unseen customer messages (optionally filter by PIN)
exports.getUnseenMessages = async (req, res) => {
  try {
    const { pin } = req.query;
    const filter = { seen: false, sender: "customer" };
    if (pin) filter.pin = pin;

    const unseen = await ChatMessage.find(filter);
    res
      .status(200)
      .json({ success: true, count: unseen.length, data: unseen });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Mark all customer messages for a PIN as seen
exports.markMessagesSeen = async (req, res) => {
  try {
    const { pin } = req.body;
    if (!pin)
      return res
        .status(400)
        .json({ success: false, message: "PIN is required" });

    await ChatMessage.updateMany(
      { pin, sender: "customer", seen: false },
      { $set: { seen: true } }
    );
    res
      .status(200)
      .json({ success: true, message: "Messages marked as seen" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete all messages for a specific PIN
exports.deleteMessagesByPin = async (req, res) => {
  try {
    const { pin } = req.params;
    if (!pin)
      return res
        .status(400)
        .json({ success: false, message: "PIN is required" });

    const result = await ChatMessage.deleteMany({ pin });
    res.status(200).json({
      success: true,
      message: `${result.deletedCount} messages deleted`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
