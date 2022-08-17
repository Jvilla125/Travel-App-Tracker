const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    itemNo: {type: Number, min: 0},
    text: String,
    }
);
const imageSchema = new mongoose.Schema({
    images: {
        type: String
    },
})
const budgetSchema = new mongoose.Schema({
    activity: String,
    activityDate: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleDateString("en-US")
    },
    cost: Number
})


const travelSchema = new mongoose.Schema({
    continent: String,
    country: String,
    city: String,
    description: String,
    dateArrived: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleDateString("en-US")
        },
    dateDeparted: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleDateString("en-US")
    },
    images: [imageSchema],
    journals: [journalSchema],
    budgets: [budgetSchema],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model("Travel", travelSchema);