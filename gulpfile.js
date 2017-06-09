var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
	return gulp.src('scss/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('css'))
});
gulp.task('sass-prod', function() {
	return gulp.src('scss/**/*.scss')
	.pipe(sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(gulp.dest('css'))
});
var minify = require('gulp-minify');

gulp.task('compress', function() {
  gulp.src(['./lib/jquery-3.2.1.min.js', './app.js'])
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('scss/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch("**/*.html").on('change', browserSync.reload);
});
