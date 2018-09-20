var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');

// Development Tasks
// -----------------


gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(postcss([ autoprefixer({
    	browsers: ['>1%'],
      cascade: false,
      grid: true,
    }) ]))
    .pipe(cssnano({
      reduceIdents: false // this helps prevent breaking animations
    })) // for mini-fying CSS, leaving off for now
    .pipe(gulp.dest('')) // Outputs it in the root folder
})

gulp.task('sass-dev', function() {
  return gulp.src('scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sourcemaps.init()) // Init sourcemaps
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(sourcemaps.write()) // Write it, it's embedded, making the file much larger. Should be turned off for Production
    .pipe(gulp.dest('')) // Outputs it in sibling CSS folder
})

// Watchers
gulp.task('watch', ['sass'], function() {
  gulp.watch('scss/**/*.scss', ['sass']);
})
gulp.task('watch-dev', ['sass-dev'], function() {
  gulp.watch('scss/**/*.scss', ['sass-dev']);
})


// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass'], 'watch',
    callback
  )
})

// dev for sourcemaps
gulp.task('dev', function(callback) {
  runSequence(['sass-dev'], 'watch-dev',
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'sass',
    callback
  )
})
