const supplier = require('../Models/supplier');
const Supplier = require('../Models/supplier');

const addSuppliers = async (req, res) => {
  const { name, gmail, age, address, contact } = req.body;


  try {
    const newSupplier = new Supplier({
      name,
      gmail,
      age,
      address,
      contact,
    });

    await newSupplier.save();
    return res.status(201).json({ supplier: newSupplier });
  } catch (err) {
    console.error("Add supplier error:", err);
    return res.status(500).json({ message: "Unable to add supplier" });
  }
};

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();

    if (!suppliers || suppliers.length === 0) {
      return res.status(404).json({ message: "No supplier found" });
    }

    return res.status(200).json({ suppliers});
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ message: "Error retrieving suppliers" });
  }
};

//  Get by ID
const getById = async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const supplier = await Supplier.findById(id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({ supplier });
  } catch (err) {
    console.error("Get by ID error:", err);
    return res.status(500).json({ message: "Error fetching supplier" });
  }
};

//  Update 
const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, gmail, age, address, contact } = req.body;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const updatedSupplier= await Supplier.findByIdAndUpdate(
      id,
      { name, gmail, age, address, contact },
      { new: true, runValidators: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: "supplier not found" });
    }

    return res.status(200).json({ supplier: updatedSupplier });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ message: "Unable to update supplier" });
  }
};

//  Delete 
const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const supplier = await Supplier.findByIdAndDelete(id);

    if (!supplier) {
      return res.status(404).json({ message: "supplier not found" });
    }

    return res.status(200).json({ message: "supplier deleted", supplier });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ message: "Unable to delete supplier" });
  }
};


exports.getAllSuppliers = getAllSuppliers;
exports.addSuppliers = addSuppliers;
exports.getById = getById;
exports.updateSupplier = updateSupplier;
exports.deleteSupplier = deleteSupplier;