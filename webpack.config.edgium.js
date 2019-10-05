const { dirname, join } = require('path');

const { DefinePlugin } = require('webpack');

const base = require('./webpack.base.config');
const merge = require('webpack-merge');
const ZipPlugin = require('zip-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(base, {
  output: {
    path: join(__dirname, 'dist', 'edgium')
  },
  plugins: [
    new CopyPlugin([
      {
        from: join(__dirname, 'src', 'manifest-chrome.json'),
        to: 'manifest.json'
      }
    ]),
    new DefinePlugin({
      'process.env.BROWSER': JSON.stringify('edgium')
    }),
    new ZipPlugin({
      filename: 'extension.zip'
    })
  ]
});
