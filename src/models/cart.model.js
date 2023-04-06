const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user_id: {type: String, required: true},
    product_id: { type: String, required: true },
    quantity: { type: String, required: true}
})

module.exports = mongoose.model('cart', cartSchema);
