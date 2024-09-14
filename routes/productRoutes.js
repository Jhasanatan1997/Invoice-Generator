const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');
const productController = require('../controllers/products-controller');

const router = express.Router();

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const result = await productController.saveProductsAndGeneratePDF(req, res);
    return res.status(200).json(result);
    
  } catch (error) {
    next(error)
  }
});

module.exports = router;