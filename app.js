var express = require('express');
var bodyParser = require('body-parser');
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
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);


// Setup static routes to files.
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

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