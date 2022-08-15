const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    itemNo: {type: Number, min: 0},
    text: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    },
    {
        timestamps: true
    }
);

const travelSchema = new mongoose.Schema({
    continent: String,
    country: String,
    city: String,
    description: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    journals: [journalSchema]
});

module.exports = mongoose.model("Travel", travelSchema);