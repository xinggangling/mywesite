const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: {
    main: './src/index.js'
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.json', '.js', '.jsx']
  },
  plugins: [
    new HappyPack({
      cache: true,
      threadPool: happyThreadPool,
      verbose: true,
      // cache: true,
      loaders: [
        {
          loader: 'babel-loader'
        }],
      threads: 4
    }),
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    // new webpack.DllReferencePlugin({
    //   context: path.resolve(__dirname, '..'),
    //   manifest: require('./vendor-manifest.json')
    // })
  ],
  module: {
    rules: [{
      test: /\.less|css$/,
      use: [{
        loader: 'style-loader' // creates style nodes from JS strings
      }, {
        loader: 'css-loader' // translates CSS into CommonJS
      }, {
        loader: 'postcss-loader',
        options: {
          config: {
            path: './postcss.config.js',
          },
        }
      }, {
        loader: 'less-loader',
        options: { javascriptEnabled: true }
      }]
    }, {
      test: /\.(js|jsx)$/,
      // use: [{loader: 'react-hot-loader'}, {loader: 'babel-loader'}],
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 50000,
          // outputPath:'images' //图片打包出去的一个目录
        }
      }]
    }, {
      test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
      use: 'file-loader'
    }]
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       antd: {
  //         test: /[\\/]node_modules[\\/]antd[\\/]/,
  //         chunks: 'initial',
  //         name: 'antd'
  //       }
  //     }
  //   }
  // },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  }
};
