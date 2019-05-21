/* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');
const env = require('yargs').argv.env; // use --env with webpack 2
const pkg = require('./package.json');

const packageName = pkg.name;
const libraryName = _.upperFirst(_.camelCase(packageName));

let outputFile, mode;

if (env === 'build') {
  mode = 'production';
  outputFile = packageName + '.min.js';
} else {
  mode = 'development';
  outputFile = packageName + '.js';
}

const config = {
  mode: mode,
  entry: __dirname + '/src/index.js',
  devtool: (env === 'build') ? false : 'inline-source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : window"
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  }
};

module.exports = config;
