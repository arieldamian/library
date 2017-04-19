var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

var nav = [{
    Link: '/books',
    Text: "Books"
    }, {
    Link: '/author',
    Text: 'Author'
    }];
var bookRouter = require('./src/routes/bookRoutes')(nav);

// Setup static routes to files.
app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/books', bookRouter);

var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({extname: 'hbs'}));

app.get('/', function (request, response) {
    response.render('index', {
        title: 'Hello from render',
        nav: [{Link: '/books', Text: "Books"}, {Link: '/authors', Text: 'Authors'}]
    });
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});