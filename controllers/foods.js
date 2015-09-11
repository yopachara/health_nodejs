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


        //console.log(list.length);
        var listcon = new Array();
        for(var i = 0;i<list.length;i++){
            listcon = listcon.concat(list[i]);
        }
        //listcon = JSON.stringify(listcon);
        //listcon = listcon.sort();

        var map = new Object();

        var counts = [];
        for(var i = 0;i < listcon.length;i++){
            if(map[listcon[i]['_id']] != null) {
                map[listcon[i]['_id']] += 1;
            } else {
                map[listcon[i]['_id']] = 1;
            }
        }
        var arr = Object.keys( map ).map(function ( key ) { return map[key]; });
        console.log(arr);
        var i = arr.indexOf(Math.max.apply(Math, arr));
                //var i = counts.indexOf(Math.max.apply(Math, counts));
        res.json(listcon[i]);

    });


    //list[2][0]['__v'] = 10;


});


function compressArray(original) {

    var compressed = [];
    // make a copy of the input array
    var copy = original.slice(0);

    // first loop goes over every element
    for (var i = 0; i < original.length; i++) {

        var myCount = 0;
        // loop over every element in the copy and see if it's the same
        for (var w = 0; w < copy.length; w++) {
            if (original[i] == copy[w]) {
                // increase amount of times duplicate is found
                myCount++;
                // sets item to undefined
                delete copy[w];
            }
        }

        if (myCount > 0) {
            var a = new Object();
            a.value = original[i];
            a.count = myCount;
            compressed.push(a);
        }
    }

    return compressed;
};
