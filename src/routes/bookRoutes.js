var express = require('express');

var bookRouter = express.Router();

var router = function (nav) {
    var books = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        }
    ];

    bookRouter.route('/')
        .get(function (request, response) {
            response.render('booksListView', {
                title: 'Hello from render',
                nav: nav,
                books: books
            })
        });

    bookRouter.route('/:id')
        .get(function (request, response) {
            var id = request.params.id;
            response.render('bookView', {
                title: 'Hello from render',
                nav: nav,
                book: books[id]
            })
        });

    return bookRouter;
};


//This is the way in which we export this file
module.exports = router;