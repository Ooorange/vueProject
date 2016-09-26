/**
 * Created by orange on 16/9/6.
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server'); //热加载服务
const pkg = require('./package.json');
const portfinder = require("portfinder"); //寻找一个可用的端口
const gutil = require('gulp-util'); //终端文字颜色工具
const colorsSupported = require('supports-color'); // 检测终端是否支持颜色
const zip = require('gulp-zip');
var del =require('del');

process.env.REPO_NAME = process.env.REPO_NAME || 'app';
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
const env = process.env.NODE_ENV;
const repoName = process.env.REPO_NAME;
const distRoot = './dist';
const appRoot = `./dist/${env}/${pkg.version}`;

var gulp = require('gulp');
gulp.task('default', function () {
  console.log('task success');
});

gulp.task('build',['clean', 'zip'], function () {
  gutil.log(gutil.colors.green('构建完成'));
});

gulp.task('clean', function () {
  return del.sync([distRoot + '/**/*', distRoot, repoName + '.zip']);
});

gulp.task('copy-static', function () {
  return gulp.src('./static/')
    .pipe(gulp.dest(appRoot));
});

// TODO delete this task in pro
gulp.task('practiceTest', function () {
  return gulp.src(['package.json', 'Makefile'])
    .pipe(gulp.dest('./test'))
    .on('end', function () {
      gutil.log(
        gutil.colors.green('this is orange\'s offic'),
        gutil.colors.green.bold(appRoot)
      );
    });
});


gulp.task('copy-check.sh', function () {
  return gulp.src(['check.sh'])
    .pipe(gulp.dest(`${distRoot}/${env}`));
});

gulp.task('copy-jenkins', function () {
  return gulp.src([
    'makefile',
    'package.json'
  ])
  .pipe(gulp.dest(`${distRoot}/${env}`))
});

gulp.task('zip', ['compile', 'copy'], function () {
  var zipFileName = repoName + '.zip';
  return gulp.src([distRoot + '/**/*'], {base: './dist'})
    .pipe(zip(zipFileName))
    .pipe(gulp.dest('./'))
    .on('end', function () {
      gutil.log(
        gutil.colors.green('生成'),
        gutil.colors.green.bold(zipFileName),
        gutil.colors.green('成功')
      );
    })
});

gulp.task('copy-nginx.conf', function () {
  return gulp.src('./n')
});

gulp.task('copy', ['copy-static', 'copy-jenkins', 'copy-check.sh']);

gulp.task('compile', function (done) {
  const config = require('./webpack.conf.js');
  if (config) {
    webpack(config).run(function (err) {
      gutil.log(gutil.colors.green('构建成功'));
      done(err);
    });
  } else {
    gutil.log(gutil.colors.red('分支存在问题,不符合发布规范'));
    done(new Error('分支存在问题,不符合发布规范'))
  }
});

gulp.task('watch', () => {
  process.env.CDN_HOST = '';

  // Start a webpack-dev-server
  const devConfig = require('./build/webpack.dev.conf');
  const compiler = webpack(devConfig);

  const server = new WebpackDevServer(compiler, {
    contentBase: 'src',
    stats: {
      colors: colorsSupported,
      chunks: false,
      modules: false,
    },
    // server and middleware options
  });

  portfinder.getPort({
    port: pkg.site_port.dev,
  }, (err, port) => {
    server.listen(port, 'localhost', (error) => {
      if (error) throw new gutil.PluginError('webpack-dev-server', error);
      // Server listening
      gutil.log(gutil.colors.magenta('[webpack-dev-server]'),
        gutil.colors.green.bold(`Server started at http://localhost:${port}`));

      // keep the server alive or continue?
      // callback();
    });
  });
});


gulp.task('webpack-dev-server',function () {
  var host = '0.0.0.0';
  var basePort = 8080;
  var webpackConfig = require('./webpack.conf');
  // const webpackConfig = require('./build/webpack.dev.conf');
  var WebpackDevServer = require('webpack-dev-server');

  var compiler = webpack(webpackConfig);
  var server = new WebpackDevServer(compiler, {
    // hot: true,
    stats: {
      colors: true,
      hash: true,
      version: true,
      timings: true,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false
    },
    // // contentBase: path.join(__dirname, './dist'),
    // publicPath: './',
    watchOptions: {
      poll: 1000
    },
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate"
    }
  });

  portfinder.getPort({
    port: basePort
  }, function (err, port) {
    server.listen(port, host, function () {
      gutil.log(`Webpack listenning at http://${host}:${port}`);
    });
  });
});
