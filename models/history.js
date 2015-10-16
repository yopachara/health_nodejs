var mongoose = require('mongoose');
var HistorySchema = new mongoose.Schema({
    username: {
        type: String,
        require: true

    },
    foodname: {
        type: String,
        require: true
    },
    cal: {
        type: Number
    },
    protein: {
        type: Number
    },
    fat: {
        type: Number
    },
    carbo: {
        type: Number
    },
    weight: {
        type: Number
    },
    classifier: {
        type: String
    },
    date: { type: Date }
});

// Export
module.exports = mongoose.model('History', HistorySchema);
