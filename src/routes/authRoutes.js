var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function () {

    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
        });

    return authRouter;
};

//This is the way in which we export this file
module.exports = router;