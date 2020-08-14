//when creating multiple variables we don't nedd to
//write var each time, instead we can make like this:
var gulp = require('gulp'), //import gulp package from node_modules file
postcss = require('gulp-postcss'),//import gulp-postcss package (in package.json)
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins');

gulp.task('styles', function() {
	return gulp.src('./app/assets/styles/styles.css')
			//features we want to implement, first use npm to install them
		.pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
		//if an error occurs we want this task to tell gulp
		//or emit out to gulp that the task ended
		.on('error', function(errorInfo) {
			console.log(errorInfo.toString());
			this.emit('end');
		})
		.pipe(gulp.dest('./app/temp/styles'));
});