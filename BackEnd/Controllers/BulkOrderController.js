const BulkOrder = require("../Models/BulkOrder");
const FuelStorage = require("../Models/FuelStorage");

// Create Bulk Order
const createBulkOrder = async (req, res) => {
  try {
    const { fuelType, quantity, preferredDate } = req.body;
    const { id } = req.params;

    if (!fuelType || !quantity) {
      return res.status(400).json({ status: 'error', message: 'Fuel type and quantity required' });
    }

    const order = new BulkOrder({
      customerId: id,
      fuelType,
      quantity,
      preferredDate: preferredDate ? new Date(preferredDate) : undefined,
    });

    await order.save();
    res.status(201).json({ status: 'ok', message: 'Order created successfully', data: order });
  } catch (err) {
    console.error('Bulk order creation error:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Get all bulk orders with customer info
const getAllBulkOrders = async (req, res) => {
  try {
    const orders = await BulkOrder.find()
      .populate('customerId', 'name gmail company')
      .sort({ createdAt: -1 });
    res.json({ status: 'ok', data: orders });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};



// Confirm order & reduce fuel stock
const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await BulkOrder.findById(orderId);
    if (!order) return res.status(404).json({ status: 'error', message: 'Order not found' });
    if (order.status !== 'pending')
      return res.status(400).json({ status: 'error', message: 'Order already processed' });

    const fuelStorage = await FuelStorage.findOne({ type: order.fuelType });
    if (!fuelStorage) {
      return res.status(404).json({ status: 'error', message: 'Fuel storage not found' });
    }
    if (fuelStorage.quantity < order.quantity) {
      return res.status(400).json({ status: 'error', message: 'Insufficient fuel stock' });
    }

    fuelStorage.quantity -= order.quantity;
    await fuelStorage.save();

    order.status = 'confirmed';
    await order.save();

    res.json({ status: 'ok', message: 'Order confirmed and fuel stock updated', data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Cancel order & add fuel stock back if it was confirmed
const rejectOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await BulkOrder.findById(orderId);
    if (!order) return res.status(404).json({ status: 'error', message: 'Order not found' });

    if (order.status === 'pending') {
      order.status = 'cancelled';
      await order.save();
      return res.json({ status: 'ok', message: 'Order cancelled', data: order });
    }

    if (order.status === 'confirmed') {
      const fuelStorage = await FuelStorage.findOne({ type: order.fuelType });
      if (!fuelStorage) {
        return res.status(404).json({ status: 'error', message: 'Fuel storage not found' });
      }

      fuelStorage.quantity += order.quantity;
      await fuelStorage.save();

      order.status = 'cancelled';
      await order.save();

      return res.json({ status: 'ok', message: 'Order cancelled and fuel stock restored', data: order });
    }

    return res.status(400).json({ status: 'error', message: 'Order already processed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Undo confirmation & add fuel stock back
const undoConfirmOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await BulkOrder.findById(orderId);
    if (!order) return res.status(404).json({ status: 'error', message: 'Order not found' });
    if (order.status !== 'confirmed')
      return res.status(400).json({ status: 'error', message: 'Order is not confirmed' });

    const fuelStorage = await FuelStorage.findOne({ type: order.fuelType });
    if (!fuelStorage) {
      return res.status(404).json({ status: 'error', message: 'Fuel storage not found' });
    }

    fuelStorage.quantity += order.quantity;
    await fuelStorage.save();

    order.status = 'pending';
    await order.save();

    res.json({ status: 'ok', message: 'Order confirmation undone and fuel stock restored', data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};



// BulkOrderController.js

const getBulkOrdersByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const orders = await BulkOrder.find({ customerId }).sort({ createdAt: -1 });
    res.json({ status: 'ok', data: orders });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// In BulkOrderController.js
const getBulkOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await BulkOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({ status: "error", message: "Order not found" });
    }
    res.json({ status: "ok", data: order });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// FuelPriceController.js
const FuelPrice = require("../Models/FuelPrice");

const getPriceByType = async (req, res) => {
  try {
    const { type } = req.params;
    const price = await FuelPrice.findOne({ fuelType: type });
    if (!price) {
      return res.status(404).json({ status: "error", message: "Fuel price not found" });
    }
    res.json({ status: "ok", data: price });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Delete bulk order
const deleteBulkOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await BulkOrder.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ status: "error", message: "Order not found" });
    }

    res.json({ status: "ok", message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};


exports.createBulkOrder = createBulkOrder;
exports.getAllBulkOrders = getAllBulkOrders;
exports.confirmOrder = confirmOrder;
exports.rejectOrder = rejectOrder;
exports.undoConfirmOrder = undoConfirmOrder;
exports.getBulkOrdersByCustomer = getBulkOrdersByCustomer;
exports.getBulkOrderById = getBulkOrderById;
exports.getPriceByType = getPriceByType;
exports.deleteBulkOrder = deleteBulkOrder;
