// requirements
var gulp = require('gulp');
var browserify = require("gulp-browserify");
//var reactify = require('reactify');
var babelify = require('babelify');
var del = require('del');
var size = require('gulp-size');

/* nicer browserify errors */
var gutil = require('gulp-util')
var chalk = require('chalk')

function map_error(err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message))
  }

  this.end()
}
/* */


// tasks
gulp.task('del', function () {
  return del(['./project/static/scripts/js']);
});

gulp.task('transform', function () {
  var stream = gulp.src('./project/static/scripts/jsx/*.js')
    .pipe(browserify({transform: ['babelify']}))
    .pipe(gulp.dest('./project/static/scripts/js/'))
    .pipe(size());
  stream.on('error', map_error);
  return stream;
});


gulp.task('default', ['del'], function () {
  gulp.start('transform');
  gulp.watch('./project/static/scripts/jsx/*.js', ['transform']);
  gulp.on('stop', () => { process.exit(0); });
  //gulp.on('err', () => { process.exit(1); });

});
