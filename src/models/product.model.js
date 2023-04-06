const mongoose = require('mongoose');
const { schema } = require('./category.model');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        maxlength: 100,
    },
    description: {
        required: true,
        type: String,
        maxlength: 100000
    },
    price: {
        required: true,
        type: Number,
        maxlength: 255
    },
    offerprice: { require: true, type: Number, maxlength: 255 },
    offerPercentage: { require: true, type: String },
    category_type: {
        type: String || Number,
        required: true,
    },
    category_id: {
        ref: String || Number,
        type: Schema.Types.ObjectId,
        required: true
    },
    shipping: {
        required: true,
        type: Boolean
    },
    available: {
        required: true,
        type: Boolean
    },
    images: {
        type: String,
        required: true
    },
    productType: { type: String, require: true },
    productDetails: {
        higlights: {
            
        },
        payment_details: {

        },
        others: {}
     }
}, { timestamps: true });

module.exports = Product = mongoose.model('products', productSchema);