// Funciones de la API de gulp
const { src, dest, series, watch } = require('gulp');

// Paquetes importados
const sass = require('gulp-sass');
const minJS = require('gulp-minify');
const minCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');


// Constantes de trabajo
const files = {
    scssPath: './src/scss/**/*.scss',
    cssPath: './dist/css/**/*.css',
    htmlPath: './dist/**/*.html',
    jsPath: './src/js/**/*.js',
    imgPath: './src/images/**/*'
}

// Tasks
const compileScss = done => {
    return src(files.scssPath)
        .pipe(sass())
        .pipe(dest('./dist/css/'));
}

const minifyJs = done => {
    return src(files.jsPath)
        .pipe(minJS())
        .pipe(dest('./dist/js'))
}

const minifyCss = done => {
    return src(files.cssPath)
        .pipe(minCSS())
        .pipe(dest('./dist/css/'));
}

const minifyImg = done => {
    return src(files.imgPath)
        .pipe(imagemin())
        .pipe(dest('./dist/images/'));
}

const watchTask = done => {
    watch(
        [files.scssPath, files.htmlPath],
        series(compileScss, minifyCss, minifyJs, minifyImg, reload)
    );
}

const serve = done => {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    done();
}

const reload = done => {
    browserSync.reload();
    done();
}

exports.default = series(compileScss, minifyCss, minifyJs, minifyImg, serve, watchTask);