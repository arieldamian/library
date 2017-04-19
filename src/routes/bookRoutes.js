var express = require('express');

var bookRouter = express.Router();

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
        response.render('books', {
            title: 'Hello from render',
            nav: [{Link: '/books', Text: "Books"}, {Link: '/authors', Text: 'Authors'}],
            books: books
        })
    });

bookRouter.route('/:id')
    .get(function (request, response) {
        var id = request.params.id;
        response.render('book', {
            title: 'Hello from render',
            nav: [{Link: '/books', Text: "Books"}, {Link: '/authors', Text: 'Authors'}],
            book: books[id]
        })
    });

//This is the way in which we export this file
module.exports = bookRouter;