'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');



const browserInit = () =>{
  browserSync.init({
    server: {
      baseDir: './public'
    },
    port: 8080,
    https: {
      key: "./ssl/server.key",
      cert: "./ssl/server.crt"
  }
  });
};

const browserReload = () => {
  browserSync.reload();
};

gulp.task('js', () => {
  return gulp.src('./resourse/js/**/*.js')
            .pipe(babel({       
              "presets": ["@babel/env"]
            }))    
            .pipe(uglify())
            .pipe(rename({
              suffix: '.min'
            }))
            .pipe(gulp.dest('./public/js'))
            .pipe(browserSync.stream())
});

gulp.task('sass', () =>{
    return gulp.src('./resourse/sass/global.scss')
      .pipe(sass({
        includePaths: ['./node_modules'],
      }))
      .on('error', sass.logError)
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./public/css'))
      .pipe(browserSync.stream())
  });

const watchFiles = () =>{
  gulp.watch('./public/**/*.html', gulp.series(browserReload));
  gulp.watch('./resourse/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('./resourse/js/**/*.js', gulp.series('js'));
}

exports.start = gulp.parallel(watchFiles,browserInit);
