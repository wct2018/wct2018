/*----------------------------------------------------------------------------*/
/* Dependencies
/*----------------------------------------------------------------------------*/

var gulp           = require('gulp'),
    $              = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*'], replaceString: /\bgulp[\-.]/}),
    argv           = require('yargs').argv,
    browserSync    = require('browser-sync'),
    runSequence    = require('run-sequence')
;

/*----------------------------------------------------------------------------*/
/* File Destinations
/*----------------------------------------------------------------------------*/

var deployFlg = false;

/**
 * Get path base
 * @return {Object}
 */
function filePaths() {
  var assetBase = deployFlg ? './docs/assets' : './dist/assets';
  return {
    'root'           : './',
    'vhost'          : 'wctokyo2017.dev',
    'port'           : 3000,
    'htmlDest'       : './dist/',
    'imagePath'      : './src/images/',
    'fontPath'       : assetBase + '/fonts',
    'imageDest'      : assetBase + '/images',
    'htmlPath'       : './src/pug/',
    'scssPath'       : './src/scss/',
    'cssDest'        : assetBase + '/css'
  };
}

/**
 * @var {Object} Sass setting
 */
var nodeSassConf = {
  includePaths  : [
    // Here is an entry point for dependencies!
    './src/scss'
  ].concat(
    require("bourbon").includePaths,
    require("bourbon-neat").includePaths,
    './node_modules/font-awesome/scss'
  ),
  outputStyle   : 'compressed'
};

/*----------------------------------------------------------------------------*/
/* BrowserSync
/*----------------------------------------------------------------------------*/

gulp.task('browser-sync', function() {
  var paths = filePaths();
  var args = {};
  if (argv.mode == 'server' ) {
    args.server =  { baseDir: paths.htmlDest };
    args.startPath = './';
  } else {
    args.proxy =  paths.vhost;
    args.open = 'external';
  };
  browserSync.init(args);
})

gulp.task('bs-reload', function() {
  browserSync.reload()
});

/*----------------------------------------------------------------------------*/
/* image tasks
/*----------------------------------------------------------------------------*/

gulp.task('image-min', function() {
  var paths = filePaths();
  return gulp.src( paths.imagePath + '**/*')
    .pipe($.imagemin({ optimizationLevel: 3 }))
    .pipe(gulp.dest(paths.imageDest));
});


/*----------------------------------------------------------------------------*/
/* Copy font Taks
 /*----------------------------------------------------------------------------*/

gulp.task('copyFont', function() {
  var paths = filePaths();
  return gulp.src( './node_modules/font-awesome/fonts/*' )
    .pipe(gulp.dest(paths.fontPath));
});


/*----------------------------------------------------------------------------*/
 /* Jade Tasks
/*----------------------------------------------------------------------------*/

gulp.task('pug', function() {
  var paths = filePaths(), dest, src;
  if ( deployFlg ) {
    src = [paths.htmlPath + 'index.pug']
    dest = './docs'
  } else {
    src = [
      paths.htmlPath + '**/*.pug',
      '!' + paths.htmlPath + '**/_*.pug'
    ];
    dest = paths.htmlDest;
  }
  return gulp.src(src)
    .pipe($.data(function(file) {
      return require('./src/html-setting.json');
    }))
    .pipe($.plumber({
      errorHandler: $.notify.onError('<%= error.message %>')
    }))
    .pipe($.pug({ pretty: true }))
    .pipe(gulp.dest(dest));
});

/*----------------------------------------------------------------------------*/
/* Sass tasks
/*----------------------------------------------------------------------------*/

gulp.task('sass', function () {
  var paths = filePaths();
  return gulp.src(paths.scssPath + '**/style.scss')
    // .pipe($.changed(paths.cssDest, {extension: '.css'}))
    .pipe($.sourcemaps.init())
    .pipe($.sassVariables({
      $env: deployFlg ? 'production' : 'development'
    }))
    .pipe($.cssGlobbing({ extensions: ['.scss'] }))
    .pipe($.sass(nodeSassConf).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10', 'ie 9'],
      cascade: false
    }))
    .pipe($.sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: paths.scssPath
    }))
    .pipe(gulp.dest(paths.cssDest));
});

/*----------------------------------------------------------------------------*/
/* gulp tasks
/*----------------------------------------------------------------------------*/

gulp.task('deploy', function() {
  deployFlg = true;
  runSequence( 'pug', 'sass', 'image-min', 'copyFont', function() {
    deployFlg = false;
    console.log( 'Deploy Done. Push them to origin/master!' );
  });
});

gulp.task('watch', function() {
  deployFlg = false;
  var paths = filePaths();
  // gulp.watch([paths.htmlDest  + '**/*'], ['bs-reload']);
  gulp.watch([paths.htmlPath  + '**/*.pug'], ['pug']);
  gulp.watch([paths.scssPath  + '**/*.scss'], ['sass']);
  gulp.watch([paths.imageDest + '**/*'], ['image-min']);
});

gulp.task('server', ['browser-sync', 'watch']);

gulp.task('default', [
  'image-min',
  'pug',
  'sass',
  'copyFont',
  'watch'
]);
