const webpack = require('webpack');
const path = require('path');
const package = require('./package.json');
const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src', 'app.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[name].js',
  },
  devtool: 'source-map',
  devServer: {
    stats: {
        chunks: false,
        colors: process.stdout.isTTY,
    },
    port: 8000,
    historyApiFallback: true,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader?localIdentName=[local]__[hash:base64:5]&modules&importLoaders=1!postcss-loader',
      }, {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?v=[0-9]+\.[0-9]+\.[0-9]+)?$/,
        include: /assets/,
        loader: 'file?name=/assets/[name].[ext]'
      }, {
        test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader',
          'image-webpack'
        ],
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ]
  },
  postcss: function(webpack) {
    return [
      postcssImport({
        dependency: webpack
      }),
      cssnext
    ];
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
};
