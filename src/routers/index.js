const express = require('express');
const router = express.Router();

const userRouter = require('./user.router');
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const cartRouter = require('./cart.router');

// router = userRouter;
// productsRouter(router);

module.exports = {
    userRouter,
    productsRouter,
    categoriesRouter,
    cartRouter
};