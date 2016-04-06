var path = require('path');
var gulp = require('gulp');
var webpack = require('webpack-stream');

gulp.task('default', function() {
  return gulp.src('public/main.js')
    .pipe(webpack({
        watch: true,
        output: {
            filename: 'bundle.js'
        }
    }))
    .pipe(gulp.dest('dist/'));
});
