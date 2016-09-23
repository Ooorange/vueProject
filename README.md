# vue-project                                        通过vue-cli脚手架快速构建项目
## Step
```
* 1 :npm install -g vue-cli
* 2 :npm init <template-name> <project name> eg:npm init webpack orange-project
```

# Using eslint grammer check
## Step
```
* 1:npm install eslint-config-airbnb": "^6.2.0,
* 2: change .eslintrc.js to 'extends: 'airbnb/base' ',
```
> orange vue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
## run gulp
  ```
  gulp
  ```
## [package.json usage introduction](http://javascript.ruanyifeng.com/nodejs/packagejson.html).
  ![alt text][id]

  [id]: ./src/resources/package.png "package介绍"
  >  scripts指定了运行脚本命令的npm命令行缩写，比如start指定了运行npm run start时，所要执行的命令。
  >  ^1.2.0表示使用1.*下最新的版本

## Learning Notes:
```
* 1 :Makefile file do not add suffix like Makefile.txt otherwise makefile rules will not work
* 2 :process.env.NODE_ENV会在编译的时候进行赋值,在运行的时候作为一个字符串类型,所以不能进行赋值,只能在编译的时候进行
* 3 :process.env.NODE_ENV 会在makefile 命令打包的时候进行截取(uat,dev,pro),在不同环境下打包时会根据这个NODE_ENV
     设置不同的服务器地址
* 4 :process.env为进程环境,要设置此NODE_ENV环境需要:export process.env.NODE_ENV=test
```
