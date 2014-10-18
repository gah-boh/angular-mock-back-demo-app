var gulp = require('gulp');
var preprocess = require('gulp-preprocess');
var rename = require('gulp-rename');

gulp.task('mock-backend-html', function() {
	gulp.src('./app/index.html')
		.pipe(preprocess({
			context: {mockBackend: true}
		}))
		.pipe(rename('index-mb.html'))
		.pipe(gulp.dest('./app'));
});

gulp.task('default', ['mock-backend-html'], function() {
	gulp.watch(['./app/index.html', './app/mock-backend/mock-backend.html'], ['mock-backend-html']);
});

