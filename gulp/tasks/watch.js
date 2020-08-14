//when creating multiple variables we don't nedd to
//write var each time, instead we can make like this:
var gulp = require('gulp'), //import gulp package from node_modules file
watch = require('gulp-watch'), //import gulp-watch package (in package.json)
//only interested in method create from browser-sync package 
browserSync = require('browser-sync').create();


// gulp refers to gulp variable created above
// task is a method with two arguments, first is name if the task we're creating
//second is what we want to happen when this task runs
//task watch
gulp.task('watch', function() {

	browserSync.init({
		//so we don't get notifications in the browser everytime the browser reloads
		notify: false,
		server: {
			baseDir: "app"
		}
	});

	//function with two arguments:
	//first: the file in our computer we want to watch for 
	//saved changes (./ to go to the root of our project)
	//second: what we want it to actually do
	watch('./app/index.html', function() {
		//name of the task we want to start, 'html'
		browserSync.reload();
	});
});

//creating another wath area
	//** any file in the future .css
watch('./app/assets/styles/**/*.css', function() {
	//any time we save a change to any css file we're triggering 
	//cssInject task
	gulp.start('cssInject');
});

//styles is a dependency task gulp has to finish before 
//beginning cssInject task
gulp.task('cssInject', ['styles'] ,function() {
	gulp.src('./app/temp/styles/styles.css')
		.pipe(browserSync.stream());
});
