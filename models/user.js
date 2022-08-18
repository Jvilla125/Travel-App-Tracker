const mongoose = require('mongoose');

// Create your User Model
const userSchema = new mongoose.Schema({
    email: String,
    googleId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);