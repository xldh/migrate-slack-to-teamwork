var gulp = require('gulp')
var webpack = require('webpack-stream');
var plumber = require('gulp-plumber');

gulp.task('watch-webpack', function () {
    var filePaths = [
        __dirname + '/../client_src/**/*.js',
        __dirname + '/../client_src/main.js'
    ];

    gulp.src(filePaths)
        .pipe(plumber())
        .pipe(webpack({
            bail: false,
            devtool: 'source-map',
            output: {
                filename: 'bundle.js'
            }
        }));

    return gulp.src(filePaths)
        .pipe(plumber())
        .pipe(webpack({
            watch: true,
            bail: false,
            devtool: 'source-map',
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe(gulp.dest(__dirname + '/../static/'));
});
