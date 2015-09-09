var Foods = require('../models/foods');
var wordcut = require("../lib/wordcut");

wordcut.init();
exports.postFoods = (function(req, res) {
    var foods = new Foods();

    foods.name = req.body.name;
    foods.cal = req.body.cal;
    foods.protein = req.body.protein;
    foods.fat = req.body.fat;
    foods.carbo = req.body.carbo;
    out = wordcut.cut(foods.name);
    console.log(out);
    foods.foodcuts = out.split("|")
    console.log(foods.foodcuts);

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
        if(req.body.name) {
            foods.name = req.body.name;
            out = wordcut.cut(foods.name);
            console.log(out);
            foods.foodcuts = out.split("|")
            console.log(foods.foodcuts);

        }
        if(req.body.cal) {
            foods.cal = req.body.cal;
        }
        if(req.body.name) {
            foods.protien = req.body.protien;
        }
        if(req.body.name) {
            foods.fat = req.body.fat;
        }
        if(req.body.name) {
            foods.carbo = req.body.carbo;
        }
        foods.save(function(err){
            if(err){
                res.send(err);
            }
            res.json(foods);
        });
    });
});

exports.deleteFood = (function(req, res){
    Foods.remove({ _id : req.params.food_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Food removed from the locker!' });
  });
});

exports.searchFood = (function(req, res){
    search = req.body.search;
    out = wordcut.cut(search);
    console.log(out);
    searchcuts = out.split("|")
    console.log(searchcuts);
    var tmp = {};
    //Foods.find({"foodcuts": search})
    for(var i = 0;i < searchcuts.length; i++){
        if (search) {
            Foods.find({ foodcuts: searchcuts[i] }, function (err, docs) {
                if(err){
                res.send(err);
                }

                tmp = JSON.parse(docs);

                //res.json(docs);
                console.log(docs);
                console.log(tmp);
            });
        }
    }
});
