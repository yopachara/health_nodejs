var mongoose = require('mongoose')

var FoodSchema = new mongoose.Schema({
    name: String,
    cal: Number,
    protien: Number,
    fat: Number,
    carbo: Number, 
    foodcuts: Array
});

//Export
module.exports = mongoose.model('Foods', FoodSchema);
