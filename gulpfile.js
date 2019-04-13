var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnano = require('gulp-cssnano');

const path = {
  sass: "scss/**/*.scss"
}

// Styles task for production `gulp styles`
gulp.task('styles', function() {
  return gulp
    .src(path.sass) // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on("error", sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(postcss([
        autoprefixer({
          browsers: [">1%"],
          cascade: false,
          grid: true
        })
      ]))
    .pipe(cssnano({ reduceIdents: false })) // this helps prevent breaking animations // for mini-fying CSS, leaving off for now
    .pipe(gulp.dest(".")); // Outputs it in the root folder
})

// Styles task for development with sourcemaps `gulp dev`
gulp.task('dev', function() {
  return gulp
    .src(path.sass) // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sourcemaps.init()) // Init sourcemaps
    .pipe(sass().on("error", sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(sourcemaps.write()) // Write it, it's embedded, making the file much larger. Should be turned off for Production
    .pipe(gulp.dest(".")); // Outputs it in sibling CSS folder
})

// Watch task
gulp.task('watch', function(){
  gulp.watch(path.sass, gulp.series("dev"));
})

// Default `gulp`
// Styles then watch
gulp.task('default', gulp.series('dev', 'watch'))

// Build `gulp build`
// Styles then stop
gulp.task('build', gulp.series('styles'))