/**
 * Created by orange on 16/9/22.
 * 作为全局的属性暴露
 */
var path = require('path');
var packageJson = require('../package.json');

var NODE_ENV = process.env.NODE_ENV;
var assetsRoot = path.join(__dirname, '../dist/', NODE_ENV, packageJson.version);
var cdnDir = packageJson['cdn-directory'];
var version = packageJson.version;
module.exports = {
  build: {
    constDefine: {
      'process.env': {
        NODE_ENV: '"' + NODE_ENV + '"',
      },
      APP_VERSION: '"' + packageJson.version + '"',
      BUILD_TIME: Date.now(),
    },
    index: path.join(assetsRoot, 'index.html'),
    assetsRoot: assetsRoot,
    assetsSubDirectory: './static',
    assetsPublicPath: NODE_ENV === 'test' ? '/' : `/${cdnDir}/${NODE_ENV}/${version}/`,
    productionSourceMap: true,
  },
  dev: {
    port: 8082,
    proxyTable: {}
  }
};
