var mongoose = require('mongoose')

var FoodSchema = new mongoose.Schema({
    name: String,
    cal: Number,
    protien: Number,
    fat: Number
});

//Export
module.exports = mongoose.model('Foods', FoodSchema);
