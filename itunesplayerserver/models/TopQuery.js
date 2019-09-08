const mongoose = require('mongoose');

const TopQuerySchema = mongoose.Schema({
    term: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('TopQueries', TopQuerySchema);