const express = require('express');
const router = express.Router();
const {
  getAllFuelPrices,
  addOrUpdateFuelPrice
} = require('../Controllers/fuelPriceController');

router.get('/', getAllFuelPrices);
router.post('/', addOrUpdateFuelPrice);

module.exports = router;
