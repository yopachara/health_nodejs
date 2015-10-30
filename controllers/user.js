// Load required packages
var User = require('../models/user');
var moment = require('moment');


// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        sex: req.body.sex,
        weight: req.body.weight,
        height: req.body.height,
        birthdate: req.body.birthdate,
        createAt: req.body.createAt,
        type: req.body.type,
        bmr: req.body.bmr,
        bmi: req.body.bmi,
        carbo: req.body.carbo,
        protein: req.body.protein,
        fat: req.body.fat
    });

    user.save(function(err) {
        if (err)
        res.send(err);

        res.json({ message: 'New User in this project!',
        "id": user.id,
        "username": user.username,
        "password": user.password,
        "sex": user.sex,
        "weight": user.weight,
        "height": user.height,
        "birthdate": user.birthdate,
        "createAt": user.birthdate,
        "type": user.type,
        "bmr": user.bmr,
        "bmi": user.bmi,
        "carbo": user.carbo,
        "protein": user.protein,
        "fat": user.fat


    });
});
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if (err)
        res.send(err);

        res.json({ result: users });
    });
};

exports.getUser = (function(req, res){
    User.find({ 'username':req.params.userid }, function(err, user){
        if(err){
            res.send(err);
        }
        res.json({result: user});
    });
});
