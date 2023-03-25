'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'none',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      'util': require.resolve('util/')
    }
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'ts-loader'
      }]
    }]
  },
  entry: {
    index: './src/index.tsx',
    cleanupUi: {
      import: './src/cleanup-ui.ts',
      filename: 'cleanup-ui.js',
    },
    setupUi: {
      import: './src/setup-ui.ts',
      filename: 'setup-ui.js',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ],
};
