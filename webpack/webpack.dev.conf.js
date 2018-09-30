const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const proxyWebpackConfig = require('./webpack.proxy.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config/development');
const apiHost = config.apiHost || '';
const apiPort = config.apiPort || 0;
const protocol = config.protocol || 'http:';
const crossOrigin = config.crossOrigin;
const host = config.host || 'localhost';
const port = config.port || 80;
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
	output: {
    path: path.resolve(__dirname, '../docker/build'),
    filename: '[name].bundle.js',
    publicPath: 'http://' + host + ':' + port + '/assets/'
  },
  module: {
    rules: []
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    proxy: crossOrigin ? proxyWebpackConfig : {},
    publicPath: 'http://' + host + ':' + port + '/assets/',
    contentBase: path.resolve(__dirname, '../src/www'),
    host: host,
    port: port,
    open: false,
    compress: false,
    hot: true,
    inline: true,
    lazy: false,
    // https: true,
    // clientLogLevel: 'none',
    historyApiFallback: true,
    // useLocalIp: true,
    // staticOptions: {
    //   redirect: true
    // },
    stats: {
      assets: true,
      chunks: false,
      colors: true,
      version: false,
      hash: true,
      timings: true,
      chunkModules: false,
      children: false,
      modules: false
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    
    // new webpack.DllReferencePlugin({
    //   context: path.resolve(__dirname, '..'),
    //   manifest: require('./vendor-manifest.json')
    // }),
    // new CopyWebpackPlugin([{
    //     from: path.resolve(__dirname, '../src/assets/js/vendor.dll.js'),
    //     to: path.resolve(__dirname, '../docker/build')
    // }]),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      filename: 'index.html',
      template: 'src/www/index.html',
      inject: true
    }),
    // new HtmlWebpackIncludeAssetsPlugin({
    //   assets: [path.resolve(__dirname, '../docker/build/vendor.dll.js')],
    //   files: ['index.html'],
    //   append: false,
    //   hash: true
    // })
  ]
})
