var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var coffee = require('gulp-coffee');

function errorHandler( error ){

    console.log(error.toString());

    this.emit('end');
}

gulp.task('sass', function(){
    gulp.src('./assets/sass/*.scss')
        .pipe(sass())
        .on('error', errorHandler)
        .pipe(gulp.dest('./assets/css'))
        .pipe(connect.reload());
});

gulp.task('coffee', function(){
    gulp.src('./assets/coffee/**/*.coffee')
        .pipe(coffee({
            bare: true
        }))
        .on('error', errorHandler)
        .pipe(gulp.dest('./app'))
        .pipe(connect.reload());
});

gulp.task('connect', function(){
    connect.server({
        port: 3000,
        livereload: true,
        root: './'
    });
});


gulp.task('watch', function(){
   gulp.watch('./assets/sass/**/*.scss', ['sass']);
   gulp.watch('./assets/coffee/**/*.coffee', ['coffee']);
});

gulp.task('default', ['sass', 'coffee', 'connect', 'watch']);