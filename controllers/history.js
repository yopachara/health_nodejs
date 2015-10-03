var History = require('../models/history');
var moment = require('moment');



var today = moment().startOf('day'),
    tomorrow = moment(today).add(1, 'days');
console.log(today.toDate());
exports.postHistory = (function(req, res){
    var history = new History();

    history.username = req.body.username;
    history.foodname = req.body.foodname;
    history.cal = req.body.cal;
    history.protein = req.body.protein;
    history.fat = req.body.fat;
    history.carbo = req.body.carbo;
    history.weight = req.body.weight;
    history.classifier = req.body.classifier;

    history.save(function(err){
        if(err){
            res.send(err);
        }
	console.log(history.username,history.foodname,'has been update history');
        res.json({ message: 'Food added to user history!', data: history })
    });
});

exports.getHistorys = (function(req, res){
    History.find({ }).sort({"date":-1}).exec(function(err, history){
        if(err){
            res.send(err);
        }
        res.json({result : history});
    });
});

exports.getHistory = (function(req, res){
    History.find({username : req.params.username}, function(err, history){
        if(err){
            res.send(err);
        }
        res.json(history);
    });
});

exports.getHistoryToday = (function(req, res){
    console.log('Get history today')
    History.find({ date: { $gte: today.toDate(),$lt: tomorrow.toDate()
    }}).sort({"date":-1}).exec(function(err, history){
        if(err){
            res.send(err);
        }
        res.json({result : history});
    });

});

