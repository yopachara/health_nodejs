var mongoose = require('mongoose');
var FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    cal: Number,
    protein: Number,
    fat: Number,
    carbo: Number,
    type: String,
    weight: Number,
    classifier: String,
    foodcuts: Array
});

//Export
module.exports = mongoose.model('Foods', FoodSchema);
