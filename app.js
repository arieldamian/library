var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

// Setup static routes to files.
app.use(express.static('public'));
// app.use(express.static('src/views'));
app.set('views', './src/views');
app.set('view engine', 'jade');

app.get('/', function (request, response) {
    // response.send('Hello world!');
    response.render('index', {list: ['a', 'b']});
});

app.get('/books', function (request, response) {
    response.send('Hello Books!');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});