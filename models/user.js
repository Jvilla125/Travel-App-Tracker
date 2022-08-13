const mongoose = require('mongoose');

// Create your User Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: {
        type: String,
        required: true
    },
    avatar: String
    // profile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}

}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);