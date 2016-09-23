var config = require('./build/config');
var utils = require('./build/utils');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    app: './src/main.js',
  },
  // eval-source-map is faster for development
  plugins: [
    new webpack.DefinePlugin(config.build.constDefine),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      chunks: ['app', 'vendor'],
      filename: config.build.index,
      template: 'index.html',
      inject: true
    }),
  ]
};
