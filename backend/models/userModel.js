const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePhoto: { type: String, default: '' }, // Store image URL or path
    description: { type: String, default: '' }, // Store user description
    refreshToken : {type: String,}
});

module.exports = mongoose.model('User', UserSchema);
