const express = require('express');
const router = express.Router();

const controller = require('../controllers/index');

router.post('/create', [
    controller.productController.fileUpload.array('image', 5),
    controller.productController.saveProducts
]);

// router.get('/', [controller.productController.getProduct]);

router.get('/deal/:type', [controller.productController.getProductByTypes]);

router.get('/:product_id', [controller.productController.getProductByID])

router.put('/edit/:product_id', controller.productController.editProduct);


module.exports = router;