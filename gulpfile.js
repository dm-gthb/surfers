'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    imagemin     = require('gulp-imagemin'),
    del          = require('del'),
    browserSync  = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
  return gulp.src('src/scss/style.scss')
    .pipe(sass())
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(gulp.dest('src/css/'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', browserSync.reload);
    gulp.watch('src/**/*.html', browserSync.reload);
});


gulp.task('img', function() {
  return gulp.src('src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'));
});


gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('default', ['watch']);


gulp.task('build', ['clean', 'img', 'sass'], function() {
  var buildCss = gulp.src('src/css/style.css')
  .pipe(gulp.dest('dist/css'))

  var buildFonts = gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))

  var buildJs = gulp.src('src/js/**/*')
  .pipe(gulp.dest('dist/js'))

  var buildHtml = gulp.src('src/*.html')
  .pipe(gulp.dest('dist'));
});
