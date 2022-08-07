const gulp = import('gulp');
const livereload = import('gulp-livereload')
const sass = import('gulp-sass');
const autoprefixer = import('gulp-autoprefixer');
const sourcemaps = import('gulp-sourcemaps');
const imagemin = import('gulp-imagemin');
const pngquant = import('imagemin-pngquant');




gulp.task('imagemin', function () {
    return gulp.src('./themes/janiectheme/src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./themes/janiectheme/src/images/'));
});


gulp.task('sass', function () {
  gulp.src('./themes/janiectheme/src/sass/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./themes/janiectheme/src/css'));
});

gulp.task('watch', function(){
    livereload.listen();

    gulp.watch('./themes/janiectheme/src/sass/**/*.scss', ['sass']);
    gulp.watch(['./themes/janiectheme/src/css/style.css', './themes/janiectheme/**/*.twig', './themes/janiectheme/js/*.js'], function (files){
        livereload.changed(files)
    });
});