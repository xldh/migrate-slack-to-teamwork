var gulp = require('gulp');
var watchLess = require('gulp-watch-less');
var less = require('gulp-less');
var plumber = require('gulp-plumber');

gulp.task('watch-less', function () {
    var lessSrc = __dirname + '/../less/**/*.less';

    return gulp.src(lessSrc)
        .pipe(watchLess(lessSrc))
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest(__dirname + '/../static/css'));
});
