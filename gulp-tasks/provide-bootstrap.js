var gulp = require('gulp');
var lessWatcher = require('gulp-less-watcher');
var less = require('gulp-less');
var plumber = require('gulp-plumber');

gulp.task('provide-bootstrap', function () {
    var bootstrapPath = [
        __dirname + '/../node_modules/bootstrap-material-design/dist/bootstrap-material-design.min.css',
        __dirname + '/../node_modules/bootstrap-material-design/dist/bootstrap-material-design.min.css.map',
    ];

    return gulp.src(bootstrapPath)
        .pipe(gulp.dest(__dirname + '/../static/css'));
});
