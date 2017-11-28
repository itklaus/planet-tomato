var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon', 'sass'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
        files: ["templates/*.pug"],
        browser: "google chrome",
        port: 7000,
	});

	gulp.watch("public/sass/master.sass", ['sass']);

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("public/sass/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("public/sass"))
        .pipe(browserSync.stream());
});


gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'index.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});
