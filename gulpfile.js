'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    mqpacker     = require('css-mqpacker'),
    imagemin     = require('gulp-imagemin'),
    del          = require('del'),
    browserSync  = require('browser-sync').create(),
    handlebars   = require('gulp-compile-handlebars'),
    fs           = require("fs"),
    yaml         = require("js-yaml"),
    path         = require("path"),
    rename       = require("gulp-rename"),
    runSequence  = require('run-sequence');

gulp.task('sass', function(){
  return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('templates', function() {
  var templateData = yaml.safeLoad(fs.readFileSync("data.yml", "utf-8"));
  var options = {
    ignorePartials: true,
    batch: ["./src/templates/patrials"],
    helpers: {
      capitals: function(str) {
        return str.toUpperCase()
      }
    }
  };

  return gulp
    .src("src/templates/*.hbs")
    .pipe(handlebars(templateData, options))
    .pipe(
      rename(function(path) {
        path.extname = ".html";
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task('img', function() {
  return gulp.src('src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'));
});

gulp.task('copy:fonts', function() {
  return gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', function() {
  return del('dist');
});

gulp.task('build', function (cb) {
  runSequence('clean',
    ['templates', 'sass', 'copy:fonts', 'img'],
    cb);
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/templates/**/*.hbs', ['templates']);
  gulp.watch('data.yml', ['templates']);
  gulp.watch('src/img/*', ['img']);
  gulp.watch('src/fonts/**/*', ['copy:fonts']);
});

gulp.task('serve', function() {
  browserSync.init({
    server: 'dist'
  });

  browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', function(cb) {
  runSequence('build',
    ['watch', 'serve'],
    cb);
});
