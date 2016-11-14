var gulp = require('gulp')
var del = require('del')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')

//console.log(gulp)
gulp.task('scripts', function () {
  del.sync(['build/alljs*'])

  return gulp.src([
    'site.js',
    'bower_components/jquery/dist/jquery.js'
  ])
    .pipe(uglify())
    .pipe(concat('alljs.min.js'))
    .pipe(gulp.dest('build'))
})

gulp.task('css', function () {
  
})

gulp.task('default', ['scripts', 'css'], function () {
  
})