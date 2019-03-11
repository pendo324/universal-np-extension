const { dirname, join } = require('path');

const { DefinePlugin } = require('webpack');

const base = require('./webpack.base.config');
const merge = require('webpack-merge');
const ZipPlugin = require('zip-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(base, {
  output: {
    path: join(__dirname, 'dist', 'firefox')
  },
  plugins: [
    new CopyPlugin([
      {
        from: join(__dirname, 'src', 'manifest-firefox.json'),
        to: 'manifest.json'
      }
    ]),
    new DefinePlugin({
      'process.env.BROWSER': JSON.stringify('firefox')
    }),
    new ZipPlugin({
      filename: 'extension.zip'
    })
  ]
});
