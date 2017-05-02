var express = require('express');
var bookRouter = express.Router();


var router = function (nav) {
    var bookService = require('../services/goodreadsService')();
    var bookController = require('../controllers/bookController')(bookService, nav);

    //This code will be executed in all the routes.
    bookRouter.use(bookController.middleware);

    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(bookController.getById);

    return bookRouter;
};

//This is the way in which we export this file
module.exports = router;