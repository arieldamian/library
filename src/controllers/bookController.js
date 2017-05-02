var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {

    var middleware = function (req, res, next) {
        if (!req.user){
            res.redirect('/');
        }
        next();
    };

    var getIndex = function (request, response) {
        var url = 'mongodb://localhost:27017/libraryApp';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');

            collection.find({}).toArray(function (err, results) {
                response.render('booksListView', {
                    title: 'Hello from render',
                    nav: nav,
                    books: results
                });
            });
        });
    };

    var getById = function (request, response) {
        var id = new objectId(request.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');

            collection.findOne({_id: id}, function (err, results) {
                response.render('bookView', {
                    title: 'Hello from render',
                    nav: nav,
                    book: results
                });
            });
        });
    };

    return {
        middleware: middleware,
        getIndex: getIndex,
        getById: getById
    }
};

module.exports = bookController;