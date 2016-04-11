var gulp = require('gulp');
var registerTasks = require('./utils/gulp').registerTasks;
registerTasks(__dirname + '/gulp-tasks');

gulp.task('default', ['provide-bootstrap', 'watch-webpack', 'watch-less']);
