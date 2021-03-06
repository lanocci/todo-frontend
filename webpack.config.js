const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 8080,
    inline: true,
    proxy: {
      '/todos/*': 'http://localhost:8081'
    }
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: path.resolve(__dirname, 'node_modules'),
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    },
    {
      test: /\.css$/,
      exclude: path.resolve(__dirname, 'node_modules'),
      loader: ['style-loader', 'css-loader']
    }]
  }
};

module.exports = config
