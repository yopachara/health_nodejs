var Foods = require('../models/foods');
var wordcut = require("../lib/wordcut");
var path = require("path"),
    fs = require("fs");
var m = require('../controllers/convertcsv.json');

// var data = fs.readFile(path.join(__dirname, 'convertcsv.json'));
// var json = JSON.parse(data);
// console.log(m.length);

//console.log(jsonObj[1]);

wordcut.init();
exports.postFoods = (function(req, res) {
    var foods = new Foods();

    foods.name = req.body.name;
    foods.cal = req.body.cal;
    foods.protein = req.body.protein;
    foods.fat = req.body.fat;
    foods.carbo = req.body.carbo;
    foods.type = req.body.type;
    foods.weight = req.body.weight;
    foods.classifier = req.body.classifier;
    out = wordcut.cut(foods.name);
    console.log(out);
    foods.foodcuts = out.split("|");
    console.log(foods.foodcuts);

    foods.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({ message: 'Food added to the database!',data: foods });
    });
});

exports.jsonConvert = (function(req, res){
    console.log('start convert json');
    for(var i = 0;i<m.length;i++){
        console.log(wordcut.cut(m[i]['name']));
        var word = wordcut.cut(m[i]['name']);
        //out = wordcut.cut(m['foodname']);
        m[i]['foodcuts'] = word.split("|");
        //console.log(myKey['foodname']);
//    console.log(m[i]["foodcuts"]);

    }
        //fs.writeFile('convertcsv.json', JSON.stringify(m));
    res.json(m);
//    res(m[1]);

});

exports.getFoods = (function(req, res){
    Foods.find(function(err, foods){
        if(err){
            res.send(err);
        }
        res.json({ result: foods} );
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
    out = wordcut.cut( req.body.name);
    foodcuts = out.split("|");
    Foods.update({ _id: req.params.food_id }, {
        name : req.body.name,
        foodcuts : foodcuts,
        cal: req.body.cal,
        protein: req.body.protein,
        fat: req.body.fat,
        carbo : req.body.carbo,
        type : req.body.type,
        weight : req.body.weight,
        classifier : req.body.classifier

    }, function(err, num) {
    if (err){
        res.send(err);
    }
    console.log(out);
    console.log(foodcuts);

    res.json({ message: num});
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
    searchcuts = out.split("|");
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

        var listcon = new Array();
        for(var i = 0;i<list.length;i++){
            listcon = listcon.concat(list[i]);
            console.log(searchcuts[i],list[i].length);
        }
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
        var namearr = Object.keys(map);
        var maxValue = Math.max.apply(null, arr);
        var newarr = new Array();
        for(var j = 0;j<arr.length;j++){
            if(arr[j] == maxValue){
                newarr.push(listcon[findIndex(listcon,'_id',namearr[j])]);
            }
        }
        for(var i = 0;i < searchcuts.length;i++){
            if(searchcuts[i]=='พิเศษ'){
                console.log('Found Extra');
                for(var k = 0;k<newarr.length;k++){
                    newarr[k].name = newarr[k].name+'พิเศษ';
                    newarr[k].cal = newarr[k].cal * 1.2;
                    newarr[k].carbo = newarr[k].carbo * 1.2;
                    newarr[k].fat = newarr[k].fat * 1.2;
                    newarr[k].protein = newarr[k].protein * 1.2;
                    newarr[k].weight = newarr[k].weight * 1.2;
                }
            }

            // if(searchcuts[i]=='ไม่ใส่'){
            //     console.log('Found Except');
            //     Foods.findOne({ name : searchcuts[i+1]},function (err, out) {
            //         console.log('this if from Except');
            //         console.log(out.name);
            //
            //         for(var k = 0;k<newarr.length;k++){
            //             newarr[k].name = newarr[k].name+'ไม่ใส่'+out.name;
            //             newarr[k].cal = newarr[k].cal - out.cal;
            //             newarr[k].carbo = newarr[k].carbo - out.carbo;
            //             newarr[k].fat = newarr[k].fat - out.fat;
            //             newarr[k].protein = newarr[k].protein - out.protein;
            //             // newarr[k].weight = newarr[k].weight out.weight;
            //             console.log(newarr[k]);
            //         }
            //     });
            //
            // }

        }
        console.log('Total',listcon.length,'object');
        console.log('Merge duplicate object', arr);
        console.log('Highest value is', maxValue);
        console.log('Total candidate value is', newarr.length);
        console.log(newarr);
        res.json({ counts : newarr.length,
                    score : maxValue/searchcuts.length,
                    result : newarr });

    });




});

function findIndex(arraytosearch, key, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
        if (arraytosearch[i][key] == valuetosearch) {
            return i;
        }
    }
    return null;
}


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
