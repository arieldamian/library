var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function (nav) {

    bookRouter.route('/')
        .get(function (request, response) {
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');

                collection.find({}).toArray(function (err, results) {
                    response.render('booksListView', {
                        title: 'Hello from render',
                        nav: nav,
                        books: results
                    })
                })
            });
        });

    bookRouter.route('/:id')
        .get(function (request, response) {
            var id = new objectId(request.params.id);
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');

                collection.findOne({_id: id}, function (err, results) {
                    response.render('bookView', {
                        title: 'Hello from render',
                        nav: nav,
                        book: results
                    })
                });
            });
        });

    return bookRouter;
};

//This is the way in which we export this file
module.exports = router;