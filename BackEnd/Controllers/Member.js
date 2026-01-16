const Member = require("../Models/Member");

const loginMember = async (req, res) => {
  const { gmail, password } = req.body;

  // Basic validation
  if (!gmail || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Case-insensitive email match
    const existingMember = await Member.findOne({
      gmail: { $regex: new RegExp(`^${gmail}$`, 'i') },
    });

    if (!existingMember) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (existingMember.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Return only needed data
    const { _id, name, role, contact } = existingMember;

    return res.status(200).json({
      message: "Login successful",
      staff: { _id, name, gmail: existingMember.gmail, role, contact },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
};


//  Get All Members
const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();

    if (!members || members.length === 0) {
      return res.status(404).json({ message: "No members found" });
    }

    return res.status(200).json({ members });
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ message: "Error retrieving members" });
  }
};

//  Add New Member
const addMembers = async (req, res) => {
  const { name, gmail, password, role, age, address, contact } = req.body;


  try {
    const newMember = new Member({
      name,
      gmail,
      password,
      role,
      age,
      address,
      contact,
    });

    await newMember.save();
    return res.status(201).json({ member: newMember });
  } catch (err) {
    console.error("Add member error:", err);
    return res.status(500).json({ message: "Unable to add member" });
  }
};

//  Get Member by ID
const getById = async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    return res.status(200).json({ member });
  } catch (err) {
    console.error("Get by ID error:", err);
    return res.status(500).json({ message: "Error fetching member" });
  }
};

//  Update Member
const updateMember = async (req, res) => {
  const { id } = req.params;
  const { name, gmail, password, role, age, address, contact } = req.body;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      { name, gmail, password, role, age, address, contact },
      { new: true, runValidators: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    return res.status(200).json({ member: updatedMember });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ message: "Unable to update member" });
  }
};

//  Delete Member
const deleteMember = async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const member = await Member.findByIdAndDelete(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    return res.status(200).json({ message: "Member deleted", member });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ message: "Unable to delete member" });
  }
};

// Reset password
const resetMemberPassword = async (req, res) => {
  const { gmail, password } = req.body;

  if (!password || password.trim().length < 4) {
    return res.status(400).json({ status: "error", message: "Invalid new password" });
  }

  try {
    const member = await Member.findOne({ gmail });
    if (!member) {
      return res.status(404).json({ status: "error", message: "member not found" });
    }

    member.password = password;
    await member.save();

    res.json({ status: "ok", message: "Password reset successful" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ status: "error", message: "Reset failed" });
  }
};

exports.loginMember = loginMember;
exports.getAllMembers = getAllMembers;
exports.addMembers = addMembers;
exports.getById = getById;
exports.updateMember = updateMember;
exports.deleteMember = deleteMember;
exports.resetMemberPassword = resetMemberPassword;
