const express = require('express');
const router = express.Router();
const { syncSales } = require('../controllers/VendaController');

router.post('/sales/sync', syncSales);
module.exports = router;
