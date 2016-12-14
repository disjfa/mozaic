var fs    = require('fs');
var gulp  = require('gulp');
var gutil = require('gulp-util');
var ftp   = require('vinyl-ftp');

function getFtpConnection() {
    if(false === fs.existsSync('.config.json')) {
        console.log('No config file found');
        return false;
    }

    let config = JSON.parse(fs.readFileSync('.config.json', 'utf8'));

    return ftp.create({
        host: config.ftp.host,
        user: config.ftp.user,
        password: config.ftp.password,
        parallel: 1,
        maxConnections: 1,
        reload: true,
        log: gutil.log
    });
}
//'deploy-subdomains'
gulp.task('deploy', ['deploy-subdomains'], function (cb) {
    let conn = getFtpConnection();

    conn.rmdir('/bin/mozaic/var/cache/prod', cb);
});

gulp.task('deploy-subdomains', ['deploy-bin'], function () {
    let conn = getFtpConnection();

    let globs = [
        'subdomains/mozaic/**'
    ];

    return gulp.src(globs, {base: './subdomains/mozaic/.', buffer: false})
        .pipe(conn.newer('subdomains/mozaic'))
        .pipe(conn.dest('subdomains/mozaic'));
});

gulp.task('deploy-bin', function () {
    let conn = getFtpConnection();

    let globs = [
        'bin/mozaic/**',
        '!bin/mozaic/var/cache/**',
        '!bin/mozaic/var/logs/**',
        '!bin/mozaic/var/sessions/**',
        '!bin/mozaic/app/config/parameters.yml'
    ];

    return gulp.src(globs, {base: './bin/mozaic/.', buffer: false})
        .pipe(conn.newer('bin/mozaic'))
        .pipe(conn.dest('bin/mozaic'));
});
