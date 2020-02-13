const express = require('express');
const router = express.Router();
const db = require('./queries');

router.get('/orders', db.getOrders);
router.get('/customers', db.getCustomers);

module.exports = router;
