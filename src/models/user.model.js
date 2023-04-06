const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true, index: true },
    phone_number: { type: Number },
    password: { type: String, required: true },
    confirm_password: { type: String, required: true },
    role: { type: String, default: 'pro-user' },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('users', userSchema, 'users');