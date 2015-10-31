var History = require('../models/history');
var moment = require('moment');
//moment().utcOffset("+07:00");



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
    console.log(moment().utcOffset("+07:00"));
    history.date =moment().utcOffset("+07:00");

    history.save(function(err){
        if(err){
            res.send(err);
        }
        history.date = moment(history.date).utc("+07:00");
        console.log(history.username,history.foodname,'has been update history');
        res.json({ message: 'Food added to user history!', data: history });
    });
});

exports.getHistorys = (function(req, res){
    History.find({ }).sort({"date":-1}).exec(function(err, history){
        if(err){
            res.send(err);
        }
        var count = 0;
        var i;
        for (i in history){
            history[i].date =  moment(history[i].date).utc("+07:00");
            if (i.hasOwnProperty(i)) {
                count++;

            }
        }
        res.json({result : history});
    });
});

exports.getHistory = (function(req, res){
    History.find({username : req.params.username}, function(err, history){
        if(err){
            res.send(err);
        }
        var count = 0;
        var i;
        for (i in history){
            history[i].date =  moment(history[i].date).utc("+07:00");
            if (i.hasOwnProperty(i)) {
                count++;

            }
        }
        res.json(history);
    });
});

exports.getHistoryToday = (function(req, res){
    var today = moment().startOf('day'),
        tomorrow = moment(today).add(1, 'days');
    console.log('Get history today');
    History.find({ date: { $gte: today.toDate(),$lt: tomorrow.toDate()
    }}).sort({"date":-1}).exec(function(err, history){
        if(err){
            res.send(err);
        }
        var count = 0;
        var i;
        for (i in history){
            history[i].date =  moment(history[i].date).utc("+07:00");
            if (i.hasOwnProperty(i)) {
                count++;

            }
        }
        res.json({result : history});
    });

});

exports.getHistoryCal = (function(req, res){
    console.log('Get history cal')
    var totalcal = [];
    var todaysub = moment().startOf('day').subtract(1, 'days'),
        tomorrowsub = moment().startOf('day');

    History.find({ date: { $gte: today.toDate(),$lt: tomorrow.toDate()
    }}).sort({"date":-1}).exec(function(err, history){
        if(err){
            res.send(err);
        }
        var count = 0;
        var i;
        var acal = 0;
        for (i in history){
            history[i].date =  moment(history[i].date).utc("+07:00");
            acal += history[count].cal;
            if (i.hasOwnProperty(i)) {
                count++;
            }
        }
        totalcal[0] = acal;
        // res.json({result : totalcal});
    });
    History.find({ date: { $gte: todaysub.toDate(),$lt: tomorrowsub.toDate()
    }}).sort({"date":-1}).exec(function(err, history){
        if(err){
            res.send(err);
        }
        var count = 0;
        var i;
        var acal = 0;
        for (i in history){
            history[i].date =  moment(history[i].date).utc("+07:00");
            acal += history[count].cal;
            if (i.hasOwnProperty(i)) {
                count++;
            }
        }
        totalcal[1] = acal;
        res.json({result : totalcal});
    });



});

exports.deleteHistory = (function(req, res){
    History.remove({ _id : req.params.historyid }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'History removed!' });
  });
});
