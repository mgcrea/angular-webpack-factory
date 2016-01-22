/* eslint-disable */

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var pkg = require('./package.json');
var deps = pkg.dependencies;
var debug = process.env.NODE_DEBUG || false;
var env = process.env.NODE_ENV || 'development';
var src = path.join(__dirname, 'src');

var externals = {};

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEV__: env === 'development'
  }),
  new HtmlWebpackPlugin({
    title: pkg.description,
    template: path.join(src, 'index.html'),
    inject: 'body'
  })
];

var resolve =   {
  alias: {}
};

switch (env) {
  case 'production':
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: true,
      sourceMap: true
    }));
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }));
    // Use official angular minified files
    externals.angular = 'angular';
    resolve.alias.angular = 'angular/angular.min.js';
    plugins.push(new CopyWebpackPlugin([
      {from: 'node_modules/angular', to: 'angular'}
    ]))
    break;
  case 'development':
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoErrorsPlugin());
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }));
    break;
  case 'test':
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoErrorsPlugin());
    break;
  default:
    break;
}

module.exports = {
  debug: debug,
  reload: true,
  devtool: env === 'production' ? 'source-map' : 'eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  noInfo: env === 'test' ? true : false,
  entry: {
    bundle: './src/index',
    vendor: [].concat(env === 'development' ? ['webpack-hot-middleware/client?quiet=true&reload=true'] : [])
  },
  output: {
    path: path.join(__dirname, env === 'production' ? 'dist' : '.tmp'),
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: plugins,
  resolve: resolve,
  externals: externals,
  module: {
    loaders: [{
      test: /angular\.min.js$/,
      loader: "exports?angular"
    }, {
      test: /\.js$/,
      include: src,
      loaders: ['ng-annotate', 'babel', 'eslint']
    }, {
      test: /(\.css|\.less)$/,
      include: src,
      loaders: ['style', 'css', 'less']
    }, {
      test: /\.html$/,
      include: src,
      exclude: path.join(src, 'index.html'),
      loaders: ['html']
    }, {
      test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=fonts/[name].[ext]'
    }]
  }
};
