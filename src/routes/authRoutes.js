var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function () {
    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
            req.login(req.body, function () {
                req.user = req.body;
                console.log(req.user);
                console.log('logged user');
                res.redirect('/auth/profile');
            })
        });
    authRouter.route('/profile')
        .get(function (req, res) {
            res.json(req.user);
        });

    return authRouter;
};

//This is the way in which we export this file
module.exports = router;