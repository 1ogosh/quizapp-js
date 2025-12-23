const { src, dest, watch, parallel, series } = require('gulp');
const path = require('path');
const browserSync = require('browser-sync').create();
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');

const paths = {
	src: {
		scss: path.join(__dirname, 'scss', '**', '*.scss'),
		js: path.join(__dirname, 'js', '**', '*.js'),
		html: path.join(__dirname, '*.html')
	},
	dist: {
		css: path.join(__dirname, 'css'),
		js: path.join(__dirname, 'js'),
		buildBase: path.join(__dirname, 'dist')
	}
};

function scripts() {
	return src(path.join(__dirname, 'js', 'main.js'), { sourcemaps: true })
		.pipe(plumber())
		.pipe(concat('main.min.js'))
		.pipe(terser())
		.pipe(dest(paths.dist.js, { sourcemaps: '.' }))
		.pipe(browserSync.stream());
}

function styles() {
	return src(path.join(__dirname, 'scss', 'style.scss'), { sourcemaps: true })
		.pipe(plumber())
		.pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], cascade: false }))
		.pipe(concat('style.min.css'))
		.pipe(dest(paths.dist.css, { sourcemaps: '.' }))
		.pipe(browserSync.stream());
}

function watching() {
	watch(paths.src.scss, styles);
	watch(paths.src.js, scripts);
	watch(paths.src.html).on('change', browserSync.reload);
}

function browsersync() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
}

function cleanDist() {
	return src(paths.dist.buildBase, { read: false, allowEmpty: true })
		.pipe(clean());
}

function building() {
	return src([
		path.join(paths.dist.css, 'style.min.css'),
		path.join(paths.dist.js, 'main.min.js'),
		path.join(__dirname, '**', '*.html')
	], { base: __dirname })
		.pipe(dest(paths.dist.buildBase));
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, scripts, browsersync, watching);