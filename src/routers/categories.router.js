const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');

router.get('/', [controller.categoryController.getCategory]);

router.post('/create', [controller.categoryController.createcategory]);
 
router.get('/:category_id', [controller.categoryController.getCategory]);

router.put('/edit/:category_id', [controller.categoryController.editCatgory]);

router.get('/special-offers');
router.get('/tranding-products');

module.exports = router;