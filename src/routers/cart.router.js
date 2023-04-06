const express = require('express');
const controller = require('../controllers/cart.controller');
const router = express.Router();


router.post('addtocart', [controller.addTocart]);

router.put('updatecart', [controller.updateCartItem])

router.get('', [controller.getCartItem]);

router.delete('removecart', [controller.deleteCartItem]);


module.exports = router;


