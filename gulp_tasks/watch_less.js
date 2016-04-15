var gulp = require('gulp');
var lessWatcher = require('gulp-less-watcher');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var eol = require('gulp-eol');

gulp.task('watch-less', function () {
    var lessSrc = __dirname + '/../client_src/less/*.less';

    return gulp.src(lessSrc)
        .pipe(lessWatcher(lessSrc))
        .pipe(less())
        .pipe(plumber())
        .pipe(eol('\n'))
        .pipe(gulp.dest(__dirname + '/../static/css'));
});
