var path = require('path');
var gulp = require('gulp');
var webpack = require('webpack-stream');

gulp.task('default', function() {
  return gulp.src('public/main.js')
    .pipe(webpack({
        watch: true,
        bail: false,
        output: {
            filename: 'bundle.js'
        }
    }))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('dist/'));
});
