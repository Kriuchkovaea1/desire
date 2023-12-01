const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

const include = require('gulp-include');

function pages() {
    return src('app/pages/*.html')
        .pipe(include({
            includePaths: 'app/components'
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

exports.pages = pages;

const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');

function fonts() {
    return src('app/fonts/src/*.*')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(src('app/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts'))
}

exports.fonts = fonts;

const imagemin = require('gulp-imagemin');

function images() {
    return src('app/images/**/*')
        .pipe(imagemin(
            [
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]
        ))
        .pipe(dest('dist/images'))
}

exports.images = images;

function styles() {
    return src('app/scss/style.scss')
        .pipe(autoprefixer({overrideBrowserList: ['last 10 version']}))
        .pipe(concat('style.min.css'))
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

exports.styles = styles;

const uglify = require('gulp-uglify-es').default;

function scripts() {
    return src(['node_modules/swiper/swiper-bundle.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/mixitup/dist/mixitup.js',
        'app/js/*.js',
        '!app/js/main.min.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}

exports.scripts = scripts;
const browserSync = require('browser-sync').create();

function watching() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    watch(['app/scss/*.scss'], styles)
    watch(['app/img/src'], images)
    watch(['app/js/main.js'], scripts)
    watch(['app/components/*', 'app/pages/*'], pages)
    watch(['app/**/*.html']).on('change', browserSync.reload);
}

exports.watching = watching;


exports.default = parallel(styles, images, scripts, pages, watching);

const clean = require('gulp-clean');

function cleanDist() {
    return src('dist')
        .pipe(clean())
}

function building() {
    return src([
        'app/css/style.min.css',
        'app/img/**/*.*',
        'app/fonts/*.*',
        'app/js/main.min.js',
        'app/**/*.html',
    ], {base: 'app'})
        .pipe(dest('dist'))
}

exports.building = building;
exports.build = series(cleanDist, building);

