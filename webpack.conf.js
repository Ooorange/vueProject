/**
 *  module.loaders 是最关键的一块配置。它告知 webpack 每一种文件都需要使用什么加载器来处理
 */
var path = require('path');
var pkg = require('./package.json');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var env = process.env.NODE_ENV;
var projectRoot = path.resolve(__dirname, './');
var appRoot = path.resolve(__dirname, `./dist/${env}/${pkg.version}`);
var config = require('./build/config.js');
var util = require('./build/utils.js');

var webpackConfig = {};
var customWebpackConfig = {};
try {
  customWebpackConfig = require('./webpack.custom.conf.js');
  console.log('Find a custom webpack config file.');
} catch (ex) {
  console.error(ex);
  console.log('No custom webpack config file.');
}

var baseWebpackConfig = {
  entry: {
    //  Make sure to use [name] or [id] in output.filename
    //  when using multiple entry points
    app: pkg.main || './src/main.js'
  },
  output: {
    path: appRoot,
    filename: '[name].js',
    publicPath: config.build.assetsPublicPath,
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, './node_modules')],
    alias: {
      'src': path.resolve(__dirname, './src'),
      'assets': path.resolve(__dirname, './src/assets'),
      'components': path.resolve(__dirname, './src/components'),
    }
  },
  resolveLoader: {
    root: path.join(__dirname, './node_modules'),
    fallback: [path.join(__dirname, './node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [path.resolve(__dirname, 'src'), /ubt-js\/src/],
        // exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 5000,
          name: util.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 5000,
          name: util.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: util.cssLoaders()
  },
  postcss: function () {
    return {
      defaults: [ require('autoprefixer') ],
    };
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${env}"`
    })
  ]
};
if (env === 'test' || env === 'dev') {
  webpackConfig = merge(baseWebpackConfig, {
    module: {
      loaders: util.styleLoaders({sourceMap: true, extract: true})
    },
    devtool: '#source-map',
    output: {
      filename: util.assetsPath(`js/[name]${ env === 'test' ? '' : '[chunkhash]' }.js`),
      chunkFilename: util.assetsPath(`js/[id]${ env === 'test' ? '' : '[chunkhash]' }.js`)
    },
    vue: {
      loaders: util.cssLoaders({
        sourceMap: true,
        extract: true
      })
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      // extract css into its own file
      new ExtractTextPlugin(util.assetsPath(`css/[name]${ env === 'test' ? '' : '[chunkhash]' }.css`)),
      // split vendor js into its own file
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module, count) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            module.resource.indexOf(
              path.join(__dirname, './node_modules')
            ) === 0
          )
        }
      }),
    ]
  });
} else if (env === 'uat' || env === 'pro') {
  webpackConfig = merge(baseWebpackConfig, {
    bail: true,
    module: {
      loaders: util.styleLoaders({sourceMap: true, extract: true})
    },
    devtool: '#hidden-source-map',
    output: {
      path: appRoot,
      filename: util.assetsPath('js/[name].[chunkhash].js'),
      chunkFilename: util.assetsPath('js/[id].[chunkhash].js')
    },
    vue: {
      loaders: util.cssLoaders({
        sourceMap: true,
        extract: true
      })
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      // extract css into its own file
      new ExtractTextPlugin(util.assetsPath('css/[name].[contenthash].css')),
      // split vendor js into its own file
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module, count) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            module.resource.indexOf(
              path.join(__dirname, './node_modules')
            ) === 0
          )
        }
      }),
    ]
  });
}

module.exports = merge(webpackConfig, customWebpackConfig);
