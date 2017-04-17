var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

//Use jshint and jscs to check mistakes.
gulp.task('style', function () {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs())
        .pipe(jscs.reporter());
});

//Inject dependency files(js and css) using 'wiredep' in our index.html automatically
//Then, inject files using gulp-inject
gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    //We define the bowerJson file route in order to inject the dependencies.
    //Then, in the bower.json we have to override the routes of the css that are missing (check bower.json of each dependency).
    //This happens because in newer versions of some dependencies, files *.css are no longer specified.
    //ignorePath just ignore part of the path and thus avoid putting it in the index.html.
    var wiredepOptions = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    var inject = require('gulp-inject');
    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read: false});
    var injectOptions = {
        ignorePath: '/public'
    };

    return gulp.src('./src/views/*.html')
        .pipe(wiredep(wiredepOptions))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});


//Automatic restart when changes are done.
//When you use watch, style and inject tasks are called too.
gulp.task('watch', ['style', 'inject'], function () {
   var watchOptions = {
       script: 'app.js',
       delayTime: 1,
       env: {
           'PORT': 3000
       },
       watch: jsFiles
   };

   return nodemon(watchOptions)
       .on('restart', function (ev) {
           console.log('Restarting...');
       })
});