var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

// Setup static routes to files.
app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({extname: 'hbs'}));

app.get('/', function (request, response) {
    response.render('index', {title: 'Hello from render', list: ['a', 'b']});
});

app.get('/books', function (request, response) {
    response.send('Hello Books!');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});