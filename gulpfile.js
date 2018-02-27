'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    mqpacker     = require('css-mqpacker'),
    imagemin     = require('gulp-imagemin'),
    del          = require('del'),
    browserSync  = require('browser-sync'),
    handlebars   = require('gulp-compile-handlebars'),
    fs           = require("fs"),
    yaml         = require("js-yaml"),
    path         = require("path"),
    rename       = require("gulp-rename");

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
    .pipe(gulp.dest('src/css/'))
    .pipe(browserSync.stream());
});

gulp.task('templates', function() {
  var templateData = yaml.safeLoad(fs.readFileSync("data.yml", "utf-8"));
  var options = {
    ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
    batch: ["./src/patrials/"],
    helpers: {
      capitals: function(str) {
        return str.toUpperCase()
      }
    }
  };

  return gulp
    .src("src/pages/*.hbs")
    .pipe(handlebars(templateData, options))
    .pipe(
      rename(function(path) {
        path.extname = ".html";
      })
    )
    .pipe(gulp.dest("src"));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'templates', 'sass'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', browserSync.reload);
    gulp.watch('src/**/*.html', browserSync.reload);
    gulp.watch('src/templates/*.hbs', ['templates']);
    gulp.watch('src/patrials/*.hbs', ['templates']);
    gulp.watch('data.yml', ['templates']);
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
