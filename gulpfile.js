const { src, dest, watch, parallel, series } = require('gulp');



const browserSync = require('browser-sync').create();
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');


function scripts() {
        return src('js/main.js')
                .pipe(concat('main.min.js'))
                .pipe(terser())
                .pipe(dest('../js'))
                .pipe(browserSync.stream())
}
function styles() {
        return src('scss/style.scss')
                .pipe(autoprefixer({ overrideBrowserlist: ['last 10 version'] }))
                .pipe(concat('style.min.css'))
                .pipe(scss({ outputStyle: 'compressed' }))
                .pipe(dest('../css'))
                .pipe(browserSync.stream())
}

function watching() {
        watch(['scss/style.scss'], styles)
        watch(['../js/main.js'], scripts)
        watch(['../*.html']).on('change', browserSync.reload);
}

function browsersync() {
        browserSync.init({
                server: {
                        baseDir: "./"
                }
        });
}

function cleanDist() {
        return src('dist')
                .pipe(clean())
}

function building() {
        return src([
                '../css/style.min.css',
                '../js/main.min.js',
                '../**/*.html'
        ], { base: '../' })
                .pipe(dest('dist'))
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, scripts, browsersync, watching);