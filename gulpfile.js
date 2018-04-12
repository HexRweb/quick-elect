'use strict';

const gulp = require('gulp');
const run = require('run-sequence');
const beep = require('beepbeep');
// const gif = require('gulp-if');

const del = require('del');

// HTML Processing assets
// const htmlreplace = require('gulp-html-replace');
// const htmlmin = require('gulp-htmlmin');

// CSS Processing assets
const concat = require('gulp-concat');
const csscomb = require('gulp-csscomb');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');

// CSS Processing - PostCSS assets
const customProperties = require('postcss-custom-properties');
const autoprefixer = require('autoprefixer');
const mergeMedia = require('css-mqpacker');
const mergeSelectors = require('postcss-combine-duplicated-selectors');
const cssnano = require('cssnano');

const sass = require('gulp-sass');

// JS Processing assets
const jsUgly = require('gulp-uglify');
const order = require('gulp-order');
// const cachebust = require('gulp-rev');

const gls = require('gulp-live-server');

const processors = [
	customProperties,
	autoprefixer({browsers: ['last 2 versions']}),
	mergeMedia(),
	mergeSelectors(),
	cssnano()
];

const swallowError = function swallowError(error) {
	console.log(error);
	beep(1);
	this.emit('end');
};

gulp.on('err', swallowError);

// @todo: finish this block; should validate and minify hbs files
// This can be done well into the future since this is a performance optimization rather than required feature set
/* // Adds cachebusting to html assets and minifies
gulp.task('compile-hbs', () => {
	let cssFile, jsFile;

	delete require.cache[require.resolve('./build/cachebust-styles.json')];
	delete require.cache[require.resolve('./build/cachebust-scripts.json')];

	try {
		cssFile = require('./build/cachebust-styles.json')['styles.min.css'];
	} catch (e) {}
	try {
		jsFile = require('./build/cachebust-scripts.json')['scripts.min.js'];
	} catch (e) {}

	const transformedCSS = cssFile ? cssFile : 'styles.min.css';
	const transformedJS = jsFile ? jsFile : 'scripts.min.js';

	return gulp.src('./src/index.html')
		.pipe(htmlreplace({
			css: `./assets/css/${transformedCSS}`,
			js: {
				src: `./assets/js/${transformedJS}`,
				tpl: '<script src="%s" async defer></script>'
			}
		}))
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest('./build'));
	}); */

gulp.task('reset', () => {
	return del.sync('./lib/assets/css/**/*');
})

gulp.task('sass', () => {
	return gulp.src('./src/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./build'));
});

// Adds backwards compatibility for css properties, increases efficiency and minifies
gulp.task('css', () => {
	const destination = './lib/assets/css';

	// We're not concatenating the css files together because sass should be organized in such a way it's not necessary.
	return gulp.src(['./lib/assets/sass/**/*.css'])
		.pipe(csscomb().on('error', swallowError))
		.pipe(sourcemaps.init())
		.pipe(postcss(processors).on('error', swallowError))
		// .pipe(cachebust())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(destination))
		// Cachebust clears the file list so we have to do 2 separate writes; used with minifying hbs
		/* .pipe(cachebust.manifest({
			path: 'cachebust-styles.json',
			base: 'lib/assets',
			merge: true
		}))
		.pipe(gulp.dest(destination)) */
});

gulp.task('js', () => {
	const destination = './build/assets/js';

	return gulp.src('./src/assets/js/*.js')
		.pipe(order([
			'src/assets/js/core.js',
			'**/*.js'
		]))
		.pipe(concat('scripts.min.js'))
		// .pipe(gif(process.env.DIST == 'true', rmDebug()))
		.pipe(sourcemaps.init())
		.pipe(jsUgly({toplevel: true}))
		// .pipe(cachebust())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(destination))
		// used with minifying hbs
		/* .pipe(cachebust.manifest({
			path: 'cachebust-scripts.json',
			base: 'build/assets'
		}))
		.pipe(gulp.dest(destination)); */
});

gulp.task('material', () => {
	const fs = require('fs-extra');
	fs.copyFileSync('./lib/assets/lib/materialize/dist/js/materialize.min.js', './lib/assets/lib/materialize.js')
	fs.copyFileSync('./lib/assets/lib/materialize.scss', './lib/assets/lib/_materialize.scss');

	// Update relative path to sass components
	let scss = fs.readFileSync('./lib/assets/lib/materialize.scss', 'utf8');
	scss = scss.replace(/components\//g, 'materialize/sass/components/');
	fs.writeFileSync('./lib/assets/lib/materialize.scss', scss);

	gulp.src('lib/assets/lib/materialize.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(csscomb().on('error', swallowError))
		.pipe(sourcemaps.init())
		.pipe(postcss(processors).on('error', swallowError))
		// .pipe(cachebust())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('lib/assets/lib/'))
		// used with minifying hbs
		/* .pipe(cachebust.manifest({
			path: 'cachebust-material.json',
			base: 'lib/assets/lib'
		}))
		.pipe(gulp.dest(destination)); */
		.on('end', () => {
			// Clean up
			scss = fs.readFileSync('./lib/assets/lib/_materialize.scss');
			fs.writeFileSync('./lib/assets/lib/materialize.scss', scss);
			fs.unlinkSync('./lib/assets/lib/_materialize.scss');
		});
});

gulp.task('watch', () => {
	const server = gls.new('./index.js');
	server.start();

	run('build');
	gulp.watch('./lib/**/**/*', (changeObject) => {
		run('build', () =>
			server.notify.call(server, changeObject)
		);
	});
});

gulp.task('build', (cb) => {
	run('reset', 'sass', ['css', 'js'], /* 'compile-html', */ cb);
});

gulp.task('default', () => {
	return run('watch');
});
