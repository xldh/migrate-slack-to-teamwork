var gulp = require('gulp');
var lessWatcher = require('gulp-less-watcher');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var eol = require('gulp-eol');

gulp.task('provide-bootstrap', function () {
    var materialPath = __dirname + '/../node_modules/bootstrap-material-design/dist/';
    var bootstrapPath = __dirname + '/../node_modules/bootstrap/dist/';

    var cssPaths = [
        bootstrapPath + 'css/bootstrap.min.css',
        materialPath + 'css/bootstrap-material-design.min.css',
        materialPath + 'css/bootstrap-material-design.min.css.map',
        materialPath + 'css/ripple.min.css',
        materialPath + 'css/ripple.min.css.map'
    ];

    var jsPaths = [
        __dirname + '/../node_modules/jquery/dist/jquery.min.js',
        bootstrapPath + 'js/bootstrap.min.js',
        materialPath + 'js/ripples.min.js',
        materialPath + 'js/ripples.min.js.map',
        materialPath + 'js/material.min.js',
        materialPath + 'js/material.js.map'
    ];

    gulp.src(cssPaths)
        .pipe(eol('\n'))
        .pipe(gulp.dest(__dirname + '/../static/css'));

    gulp.src(jsPaths)
        .pipe(eol('\n'))
        .pipe(gulp.dest(__dirname + '/../static/ext_lib'));
});
