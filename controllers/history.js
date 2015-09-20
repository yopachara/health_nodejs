var History = require('../models/history');

exports.postHistory = (function(req, res){
    var history = new History();

    history.username = req.body.username;
    history.foodname = req.body.foodname;

    history.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({ message: 'Food added to user history!', data: history })
    });
});

exports.getHistorys = (function(req, res){
    History.find(function(err, history){
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

