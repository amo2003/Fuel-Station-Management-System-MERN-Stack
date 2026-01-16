const express = require("express");
const router = express.Router();
const bulkOrderController = require("../Controllers/BulkOrderController");

router.post('/create/:id', bulkOrderController.createBulkOrder);
router.get('/customer/:customerId', bulkOrderController.getBulkOrdersByCustomer);
router.put('/confirm/:orderId', bulkOrderController.confirmOrder);
router.put('/reject/:orderId', bulkOrderController.rejectOrder);
router.put('/undo-confirm/:orderId', bulkOrderController.undoConfirmOrder);

router.get('/all', bulkOrderController.getAllBulkOrders);

router.get("/api/bulkorders/:orderId", bulkOrderController.getBulkOrderById);
router.get("/fuelprices/:type", bulkOrderController.getPriceByType);
router.delete("/:orderId", bulkOrderController.deleteBulkOrder);



module.exports = router;
