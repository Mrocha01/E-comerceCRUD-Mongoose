const express = require('express');
const router = express.Router();

const ProductControllers = require('../controllers/ProductController');

router.get('/create', ProductControllers.createProduct);
router.post('/create', ProductControllers.createProductPost);
router.get('/', ProductControllers.showProducts);
router.get('/edit/:id', ProductControllers.editProduct);
router.post('/edit', ProductControllers.editProductPost);
router.get('/:id', ProductControllers.getProduct);
router.post('/remove/:id', ProductControllers.removeProduct);

module.exports = router;