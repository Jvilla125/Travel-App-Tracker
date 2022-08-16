const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    itemNo: {type: Number, min: 0},
    text: String,
    }
);
const imageSchema = new mongoose.Schema({
    img: [{
        data: Buffer,
        contentType: String
    }],
})
const travelSchema = new mongoose.Schema({
    continent: String,
    country: String,
    city: String,
    description: String,
    images: [imageSchema],
    journals: [journalSchema],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model("Travel", travelSchema);