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

/*exports.searchFood = (function(req, res){*/
    //search = req.body.search;
    //out = wordcut.cut(search);
    //console.log(out);
    //searchcuts = out.split("|")
    //console.log(searchcuts);
    //var tmp;
    ////Foods.find({"foodcuts": search})
    //for(var i = 0;i < searchcuts.length; i++){
        //Foods.find({ foodcuts: searchcuts[i] }, function (err, docs) {
            //if(err){
                //res.send(err);
            //}
            //tmp = docs;
            ////res.json(docs);
            //console.log(docs);
            //console.log(tmp);
            //if (tmp === undefined) {
            //console.log('tmp is undefined')
            //}
        //});

        //res.json(tmp);
        //if (tmp === undefined) {
            //console.log('tmp is undefined')
        //}


    //}
    //console.log(tmp);

    //res.json(tmp);
/*});*/

/*exports.searchFood = (function(req, res){*/
    //search = req.body.search;
    //out = wordcut.cut(search);
    //console.log(out);
    //searchcuts = out.split("|")
    //console.log(searchcuts);
    //var tmp = null;
    ////Foods.find({"foodcuts": search});
    //for(var i = 0;i < searchcuts.length; i++){
        //Foods.find({ foodcuts: searchcuts[i] }, function (err, docs) {
            //tmp = docs;
////            console.log(docs);
            //console.log(docs);
            //tmp = JSON.stringify(docs);

        //});
    //}
    //res.json(tmp);
/*});*/

exports.searchFood = (function(req, res){
    search = req.body.search;
    out = wordcut.cut(search);
    console.log(out);
    searchcuts = out.split("|")
    console.log(searchcuts);
    var tmp = null;
    list = [];
    function asyncLoop(i, cb) {
        if (i < searchcuts.length) {
            Foods.find({ foodcuts: searchcuts[i]}).exec(function (err, o) {
                list.push(o);
                asyncLoop(i+1, cb);
            });
     } else {
            cb();
        }
    }

    asyncLoop(0, function() {
        list[0][0]['__v'] = 1;
        console.log(list[0].length);
       // var count = [];
        /*for(var i = 0;i < list.length ;i++){*/
            //for(var j = 0;j< list[i].length;j++){
               //if(count[i][j][_id] != list[i])
                //count = list[i][j];
            //}
        /*}*/
        var array1 = list[0];
        var array2 = list[1];
        var array3 = list[2];
        // Merges both arrays and gets unique items
        var array3 = array1.concat(array2).concat(array3);
        //console.log(array3);
        console.log(array3[2]);

        var map = new Object();
        //array3 = array3.sort();
        var result = JSON.stringify(array3);
        for(var i = 0; i < result.length; i++) {
            if(map[result[i]] != null) {
                map[result[i][_id]] += 1;
                result[i]['count'] =1;
            }else {
                map[array3[i][_id]] = 1;
                result[i]['count'] = 1;
            }

        }
        result[0]['count'] = 2;
        var result2 = JSON.stringify(map);
        console.log(result2);


        //console.log(array3);
        //console.log(
        //var counts = {};
        //array3.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });

        //console.log(counts);


        res.json(map);
    });
});
