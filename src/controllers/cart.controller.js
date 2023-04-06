
const cart = require('../models/cart.model');

async function addTocart(req, res) {
    console.log(req);
    await new cart({
        ...req.body
    }).save((err, cartItem) => {
        if (err) return res.json(500).send(err);
        return res.status(201).json(cartItem)
    }).catch(item => {
        console.log(item);
    })
}

async function getCartItem(req, res) {
    const items = await cart.find();
    res.status(200).json(items);
}

module.exports = {
    addTocart: addTocart,
    getCartItem: getCartItem
}