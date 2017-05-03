var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});

var goodreadsService = function () {

    var getBookById = function (id, cb) {
        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/' + id + '?format=xml&key=O6iyFePHpNalMa2vLwvUQg'
        };
        var callback = function (response) {
            var string = '';

            response.on('data', function (chunck) {
                string += chunck;
            });
            response.on('end', function () {
                parser.parseString(string, function (err, result) {
                    cb(null, {description: result.GoodreadsResponse.book});
                });
            });
        };

        http.request(options, callback).end();
    };

    return {
        getBookById: getBookById
    };
};

module.exports = goodreadsService;