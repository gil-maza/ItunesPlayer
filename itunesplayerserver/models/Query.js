const mongoose = require('mongoose');

const QuerySchema = mongoose.Schema({
    term: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 1
    }
});

module.exports = mongoose.model('Queries', QuerySchema);