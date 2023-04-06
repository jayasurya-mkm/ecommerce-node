const responseCommon = require('../common/response.common');
const userModel = require('../models/user.model');


async function loginUser(req, res, next) {
    try {
        const user = await userModel.find({ email: req.body.email });
        const respData = {
            id: user[0]._id,
            username: user[0].username,
            role: user[0].role
        };
        if (!!user && user.length >= 1 && user[0].email === req.body.email && user[0].password === req.body.password) {
            res.status(200).json(responseCommon.successResponse(respData, 200, "Sign-in successfully"));
        } else {
            res.status(200).json({ message: 'Invalid Mail/Password' });
        }
    } catch (error) {
        res.status(500).json(responseCommon.faildResponse(500, error));
    }
    next();
}

async function signUp(req, res, next) {
    const addUser = new userModel({
        ...req.body
    });
    addUser.save((error, user) => {
        if (error) return res.status(500).json(responseCommon.faildResponse(500, error));
        const respData = {
            id: addUser._id,
            username: addUser.username,
            role: addUser.role
        };
        res.status(201).json(responseCommon.successResponse(respData, 201, 'user sign-up successfully'));
    });
}

async function getAllUsers(req, res, next) {
    const data = await userModel.find();
    res.status(201).json(responseCommon.successResponse(data, 201, 'fetch user successfully'));
}

module.exports = { 
    loginUser,
    signUp,
    getAllUsers
};