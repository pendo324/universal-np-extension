const { dirname, join } = require('path');

const { DefinePlugin } = require('webpack');

const base = require('./webpack.base.config');
const merge = require('webpack-merge');
const ZipPlugin = require('zip-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(base, {
  output: {
    path: join(__dirname, 'dist', 'edge')
  },
  plugins: [
    new CopyPlugin([
      {
        from: join(__dirname, 'src', 'manifest-edge.json'),
        to: 'manifest.json'
      },
      {
        from: join(__dirname, 'src', 'backgroundScriptsAPIBridge.js'),
        to: 'backgroundScriptsAPIBridge.js'
      },
      {
        from: join(__dirname, 'src', 'contentScriptsAPIBridge.js'),
        to: 'contentScriptsAPIBridge.js'
      }
    ]),
    new DefinePlugin({
      'process.env.BROWSER': JSON.stringify('edge')
    }),
    new ZipPlugin({
      filename: 'extension.zip'
    })
  ]
});
