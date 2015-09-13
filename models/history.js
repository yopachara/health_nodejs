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
    date: { type: Date, default: Date.now }
});

// Export
module.exports = mongoose.model('History', HistorySchema);
