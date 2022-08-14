const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    continent: String,
    country: String,
    city: String,
    description: String
});

const profileSchema = new mongoose.Schema({
        name: String,
        avatar: String,
        trips: [tripSchema]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Profile", profileSchema);