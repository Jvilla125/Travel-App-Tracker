const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    text: String
})

module.exports = mongoose.model("Journal", journalSchema);