'use strict';

let path 		= require('path');
let mkdirp 		= require('mkdirp');
let del			= require('del');
let source 		= require('vinyl-source-stream');
let browserSync = require('browser-sync');
let browserify 	= require('browserify');
let glob 		= require('glob');
let gulp 		= require('gulp');
let babel		= require('gulp-babel');
let debug		= require('gulp-debug');
let concat 		= require('gulp-concat');
let eslint 		= require('gulp-eslint');
let uglify 		= require('gulp-uglify');
let reactify	= require('reactify');
let babelify 	= require('babelify');
let envify		= require('envify/custom');
let cleanCss 	= require('gulp-clean-css');

let reload = browserSync.reload;

// Additionally we create
// public/js/components.js <- React
// public/js/app.js <- Browserify
//
let targets = {
	scripts: 	'./source/scripts',
	_scripts: 	'./public/js',
	styles:		'./source/styles',
	_styles:	'./public/css',
	views:		'./source/views',
	_views:		'./public',
	jsx:  		'./source/jsx'
};

gulp.task('clean', done => {
	del.sync('./public');
	[
		targets._scripts,
		targets._styles
	].forEach(key => mkdirp.sync(key));
	
	done();
});

// Lint js files
//
gulp.task('lint-js', ['react'], () => gulp.src(path.join(targets.scripts, '**/*.js'))
	.pipe(debug({
		title: 'linting js:'
	}))
	.pipe(eslint()));

// Move js files
// Note: every .js file *except* app.js
//
gulp.task('js', ['lint-js'], () => gulp.src(path.join(targets.scripts, '**/!(app).js'))
	.pipe(debug({
		title: 'processing js files:'
	}))
	.pipe(babel({
		presets: ['env']
	}))
	.pipe(uglify())
	.pipe(gulp.dest(targets._scripts))
	.pipe(reload({
		stream: true
	})));

// Concatenate .css files into app.css bundle, and move.
//
gulp.task('concat-css', () => gulp.src(path.join(targets.styles, '**/*.css'))
	.pipe(debug({
		title: 'css bundling:'
	}))
	.pipe(concat('app.css'))
	.pipe(cleanCss())
	.pipe(gulp.dest(targets._styles))
	.pipe(reload({
		stream: true
	})));

// All .html files in source folder
//
gulp.task('views', () => gulp.src(path.join(targets.views, '**/*.html'))
	.pipe(debug({
		title: 'building views:'
	}))
	.pipe(gulp.dest(targets._views))
	.pipe(reload({
		stream: true
	})));

// Compile JSX
//
gulp.task('react', done => browserify({
		entries: glob.sync(path.join(targets.jsx, '**/*.jsx')),
		debug: false
	})
	.transform('babelify', { presets: ['env', 'react'] })
	.transform(envify({ NODE_ENV: 'production' }))
	.transform('uglifyify', { global: true  })
	.bundle()
	.pipe(source('components.js'))
	.pipe(gulp.dest(targets._scripts))
	.pipe(reload({
		stream: true
	})));

// Fetch our main app code and browserify it
// This bundle will be loaded by views, such as index.html
//
gulp.task('browserify', () => browserify('./' + targets.scripts + '/app.js')
	.transform('babelify', { presets: ['env', 'react'] })
	.transform('uglifyify', { global: true  })
	.bundle()
	.pipe(source('app.js'))
	.pipe(gulp.dest(targets._scripts))
	.pipe(reload({
		stream: true
	})));

gulp.task('browsersync', done => {

	// We don't expose the live server in production.
	// This is intended to run on local dev boxes.
	//
	if(process.env.PRODUCTION) {
		return done();
	}

	browserSync({
		notify: false,
		injectChanges: false,
		ghostMode: {
			clicks: true,
			forms: true,
			scroll: true
		},
		browser: "google chrome",
		scrollThrottle: 100,
		proxy: '127.0.0.1:8080'
	});

	gulp.watch(path.join(targets.scripts, '**/!(app).js'), ['js']);
	gulp.watch(path.join(targets.views, '**/*.html'), ['views']);
	gulp.watch(path.join(targets.styles, '**/*.css'), ['concat-css']);
	gulp.watch(path.join(targets.scripts, 'app.js'), ['browserify']);
	gulp.watch(path.join(targets.jsx, '**/*.jsx'), ['browserify']);
	
	done();
});

// This is what runs when you execute generic `gulp`
//
gulp.task('default', [
	'clean',
	'lint-js',
	'js',
	'concat-css',
	'views',
	'browserify',
	'react'
], done => done());