var Foods = require('../models/foods');

exports.postFoods = (function(req, res) {
    var foods = new Foods();

    foods.name = req.body.name;
    foods.cal = req.body.cal;
    foods.protien = req.body.protien;
    foods.fat = req.body.fat;

    foods.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({ message: 'Food added to the database!',data: foods });
    });
});

exports.getFoods = (function(req, res){
    Foods.find(function(err, foods){
        if(err){
            res.send(err);
        }
        res.json(foods);
    });
});

exports.getFood = (function(req, res){
    Foods.findById(req.params.food_id, function(err, foods){
        if(err){
            res.send(err);
        }
        res.json(foods);
    });
});

exports.putFood = (function(req, res){
    Foods.findById(req.params.food_id, function(err,foods){
        if(err){
            res.send(err);
        }
        foods.name = req.body.name;
        foods.cal = req.body.cal;
        foods.protien = req.body.protien;
        foods.fat = req.body.fat;

        foods.save(function(err){
            if(err){
                res.send(err);
            }
            res.json(foods);
        });
    });
});

exports.deleteFood = (function(req, res){
    Foods.findByAndRemove(req.params.food_id, function(err){
        if(err){
            res.send(err);
        }
        res.json({ message: 'Food removed form the store! Yeahh' });
    });
});
