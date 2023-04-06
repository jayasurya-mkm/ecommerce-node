const express = require('express');
const router = express.Router();

const handler = require('../controllers/user.controller');


router.get('/', [handler.getAllUsers]);

router.post('/signup', handler.signUp);

router.post('/signin', handler.signUp);


module.exports = router;