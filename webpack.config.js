
var webpack = require('webpack');
var path = require('path');
var debug = process.env.NODE_DEBUG || false;
var env = process.env.NODE_ENV || 'development';
var src = path.join(__dirname, 'src');

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEV__: env === 'development'
  })
];

switch (env) {
  case 'production':
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true
    }));
    break;
  case 'development':
  case 'test':
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoErrorsPlugin());
    break;
}

module.exports = {
  debug: debug,
  reload: true,
  devtool: env === 'production' ? 'source-map' : 'eval-source-map', //more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  noInfo: env === 'test' ? true : false,
  entry: env === 'development' ? ['webpack-hot-middleware/client?quiet=true&reload=true', './src/index'] : ['./src/index'],
  output: {
    path: path.join(__dirname, env === 'production' ? 'dist' : '.tmp'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.js$/,
      include: src,
      loaders: ['ng-annotate', 'babel', 'eslint']
    }, {
      test: /(\.css|\.scss)$/,
      // include: src,
      loaders: ['style', 'css'/*, 'sass'*/]
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
