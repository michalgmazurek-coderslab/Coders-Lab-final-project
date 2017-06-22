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
  gulp.src(['./app.js'])
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('lib'))
});

var concat = require('gulp-concat');

gulp.task('scripts', ["compress"],  function() {
  return gulp.src(['./lib/jquery-3.2.1.min.js', './lib/app.js'])
    .pipe(concat('all.js'))
	.pipe(gulp.dest('./lib/'));


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



gulp.task("copy-html", ["scripts"], function(){

	gulp.src("./index.html")
		.pipe(gulp.dest('./dist/'));

});

gulp.task("copy-css", ["compress"], function(){

	gulp.src("./css/main.css")
		.pipe(gulp.dest('./dist/css/'));

});

gulp.task("copy-img", function(){

	gulp.src("./img/**.*")
		.pipe(gulp.dest('./dist/img/'));

});

gulp.task("copy-sounds", function(){

	gulp.src("./sounds/**.*")
		.pipe(gulp.dest('./dist/sounds/'));

});

gulp.task("copy-js", function(){

	gulp.src(["./lib/app.js","./lib/*.min.js"])
		.pipe(gulp.dest('./dist/js/'));

});

gulp.task("production-build", ["copy-html", "copy-css", "copy-img", "copy-js", "copy-sounds"]);
