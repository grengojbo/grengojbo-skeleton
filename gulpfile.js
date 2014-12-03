'use strict';

var config = require('./config/build.config.js');
var karmaConfig = require('./config/karma.config.js');
var protractorConfig = require('./config/protractor.config.js');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var pkg = require('./package');
var karma = require('karma').server;
var del = require('del');
var _ = require('lodash');
// var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');
var rename = require("gulp-rename");
// var concat = require('gulp-concat');
// var php2html = require("gulp-php2html");
/* jshint camelcase:false*/
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

//update webdriver if necessary, this task will be used by e2e task
gulp.task('webdriver:update', webdriverUpdate);

// optimize images and put them in the dist folder
gulp.task('images:old', function() {
  return gulp.src(config.base + config.images)
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(config.distTmp + '/static/images'))
    .pipe($.size({
      title: 'images:old'
    }));
});
gulp.task('images', function() {
  return gulp.src(config.base + config.images)
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(config.tmp + '/images'))
    .pipe(gulp.dest(config.assets + '/images'))
    .pipe($.size({
      title: 'images'
    }));
});

//generate css files from scss sources
gulp.task('sass', function() {
  return gulp.src(config.mainScss)
    .pipe($.rubySass({lineNumbers: true, style: 'expanded'}))
    .on('error', function(err) {
      console.log(err.message);
    })
    // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    // .pipe(autoprefixer('last 10 versions'))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.tmp + '/css'))
    .pipe($.size({
      title: 'sass'
    }));
});

//build files for creating a dist release
gulp.task('build:release', function(cb) {
  runSequence('build:dist', ['copy:head', 'copy:static'], cb);
  // runSequence(['build', 'copy:assets'], 'html', cb);
});

//build files for creating a dist release
gulp.task('build:dist', ['clean'], function(cb) {
  runSequence(['jshint', 'include:dust', 'copy', 'copy:assets', 'images', 'sass', 'copy:fonts'], 'html', cb);
});

//build files for development catberry
gulp.task('build:cat', ['clean'], function(cb) {
  runSequence(['include:dust', 'copy', 'copy:assets', 'images', 'sass'], cb);
});

//build files for development
gulp.task('build', ['clean'], function(cb) {
  // runSequence(['sass', 'templates'], cb);
  runSequence(['copy', 'copy:assets', 'images', 'sass', 'include'], cb);
});

gulp.task('include', function() {
  gulp.src([config.templates + '/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(config.base + '/'))
    .pipe($.size({
      title: 'include'
    }));
});

gulp.task('include:dust', function() {
  gulp.src([config.templates + '/**/*.dust'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(config.cat))
    .pipe($.size({
      title: 'include:dust'
    }));
});

gulp.task('html', function() {
  var assets = $.useref.assets({
    searchPath: '{build,src,public}'
  });

  return gulp.src(config.templates + '/cat-header.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(assets)
    .pipe($.if(config.map, $.sourcemaps.init()))
    .pipe($.if('**/*main.js', $.ngAnnotate()))
    .pipe($.if('**/*main.js', $.uglify({
      mangle: false,
    })))
    .pipe($.if('*.css', $.csso()))
    .pipe($.if(['**/*main.js', '**/*main.css'], $.header(config.banner, {
      pkg: pkg
    })))
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    // .pipe($.if('*.html', $.minifyHtml({
      // empty: true
    // })))
    .pipe($.if(config.map, $.sourcemaps.write()))
    .pipe(gulp.dest(config.distTmp))
    .pipe($.size({
      title: 'html'
    }));
});

gulp.task('html:footer', function() {
  var assets = $.useref.assets({
    searchPath: '{build,src,public}'
  });

  return gulp.src(config.templates + '/cat-footer.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(assets)
    .pipe($.if(config.map, $.sourcemaps.init()))
    .pipe($.if('**/*main.js', $.ngAnnotate()))
    .pipe($.if('*.js', $.uglify({
      mangle: false,
    })))
    .pipe($.if('*.css', $.csso()))
    .pipe($.if(['**/*main.js', '**/*main.css'], $.header(config.banner, {
      pkg: pkg
    })))
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    // .pipe($.if('*.html', $.minifyHtml({
      // empty: true
    // })))
    .pipe($.if(config.map, $.sourcemaps.write()))
    .pipe(gulp.dest(config.distTmp))
    .pipe($.size({
      title: 'html'
    }));
});

gulp.task('copy:static', function() {
  return gulp.src([
      config.distTmp + '/static/**'
    ]).pipe(gulp.dest(config.dist + '/static'))
    .pipe($.size({
      title: 'copy:static'
    }));
});

gulp.task('copy:fonts', function() {
  return gulp.src([
      config.base + config.fonts,
      config.base +  '/static/vendor/font-awesome/fonts/*'
      // config.base + '/**/*',
      // '!' + config.templates,
      // '!' + config.base + '/static/scss*',
      // '!' + config.base + '/static/vendor*'
    ]).pipe(gulp.dest(config.assets + '/fonts'))
    .pipe($.size({
      title: 'copy:assets'
    }));
});

//copy assets in dist folder
gulp.task('copy:assets', function() {
  return gulp.src([
      config.assetsSrc
    ]).pipe(gulp.dest(config.assets))
    .pipe($.size({
      title: 'copy:assets'
    }));
});

//copy vendor in tmp folder
gulp.task('copy:vendor', function() {
  return gulp.src([
      config.vendor
    ]).pipe(gulp.dest(config.tmp + "/vendor"))
    .pipe($.size({
      title: 'copy:vendor'
    }));
});

gulp.task('copy:head', function() {
  return gulp.src([
      config.distTmp + '/cat-header.html'
    ])
    .pipe(rename('main/placeholders/head.dust'))
    .pipe(gulp.dest(config.cat))
    .pipe($.size({
      title: 'copy:head'
    }));
});

//copy dust in tmp folder
gulp.task('copy:dust', function() {
  return gulp.src([
      config.templates + '/**/*.dust'
    ]).pipe(gulp.dest(config.cat))
    .pipe($.size({
      title: 'copy:dust'
    }));
});

//copy fonts in tmp folder
gulp.task('copy:dev', function() {
  return gulp.src([
      config.base + config.fonts
    ]).pipe(gulp.dest(config.tmp + "/fonts"))
    .pipe($.size({
      title: 'copy:dev'
    }));
});

//copy assets in dist folder
gulp.task('copy', function() {
  return gulp.src([
      '!' + config.base + '/static/images/**',
      '!' + config.base + '/static/scss/**',
      config.base + '/static/**/*'
    ]).pipe(gulp.dest(config.tmp))
    .pipe($.size({
      title: 'copy'
    }));
});

//clean temporary directories
// gulp.task('clean', del.bind(null, [config.dist, config.tmp]));
gulp.task('clean', del.bind(null, [config.index, config.tmp, 'build']));

//lint files
gulp.task('jshint', function() {
  return gulp.src(config.js)
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('jshint:catberry', function() {
  return gulp.src(config.catberry)
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

/* tasks supposed to be public */


//default task
gulp.task('default', ['serve']); //

//run the server after having built generated files, and watch for changes
gulp.task('server', ['build:cat'], function() {
  browserSync({
    notify: false,
    logPrefix: pkg.name,
    proxy: config.proxy,
    files: [config.base + '/static/**']
  });

  gulp.watch(config.html, ['include:dust', reload]);
  gulp.watch(config.scss, ['sass', reload]);
  gulp.watch(config.js, ['jshint', 'copy', reload]);
  // gulp.watch(config.catberry, ['jshint:catberry', reload]);
  gulp.watch(config.assets, reload);
});

gulp.task('server:dist', ['build:release'], function() {
  browserSync({
    notify: false,
    logPrefix: pkg.name,
    files: [config.dist + '/static/**'],
    proxy: config.proxy
  });
});

//run the server after having built generated files, and watch for changes
gulp.task('serve', ['build'], function() {
  browserSync({
    notify: false,
    logPrefix: pkg.name,
    server: [config.tmp, config.base, 'public']
  });

  gulp.watch(config.html, ['include', reload]);
  gulp.watch(config.scss, ['sass', reload]);
  // gulp.watch(config.js, ['copy', reload]);
  gulp.watch(config.js, ['jshint', 'copy', reload]);
  // gulp.watch(config.tpl, ['templates', reload]);
  gulp.watch(config.assets, reload);
});

// gulp.task('dist', ['build:dist']);
gulp.task('dist', ['build:release']);

