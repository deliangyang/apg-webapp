var gulp = require('gulp'),
    fs = require('fs'),
    //watch = require('gulp-watch'),
    GulpSSH = require('gulp-ssh');

var config = {
    host: 'www.sourcedev.cc',
    port: 22,
    username: 'deliang',
    //privateKey: fs.readFileSync('C:\\Users\\Administrator\\.ssh\\id_ras1')
    privateKey: fs.readFileSync('/Users/ydl/.ssh/id_rsa')
};

var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
});

gulp.task('sync', function () {
    gulp.src('dist/**')
        .pipe(gulpSSH.dest('/home/deliang/www/comeon'));
    // return watch('dist/**', function() {
    //     gulp.src('dist/**')
    //         .pipe(gulpSSH.dest('/home/deliang/www/hi_come_on'));
    // });
});
