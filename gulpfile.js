/**
 * Created by orange on 16/9/6.
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server'); //热加载服务
const pkg = require('./package.json');
const portfinder = require("portfinder"); //寻找一个可用的端口
const gutil = require('gulp-util'); //终端文字颜色工具
const colorsSupported = require('supports-color'); // 检测终端是否支持颜色

process.env.REPO_NAME = process.env.REPO_NAME || 'app';
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var gulp = require('gulp');
gulp.task('default', function () {
  console.log('task success');
});

gulp.task('build', function () {
  gutil.log(gutil.colors.green('构建完成'));
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
