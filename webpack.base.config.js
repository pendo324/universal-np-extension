const { join } = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
  entry: {
    'worker-es6': join(__dirname, 'src', 'worker-es6.js'),
    popup: join(__dirname, 'src', 'popup.js'),
    background: join(__dirname, 'src', 'background.js')
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new CopyPlugin([
      { from: join(__dirname, 'src', 'icon.png'), to: 'icon.png' },
      { from: join(__dirname, 'src', 'popup.html'), to: 'popup.html' }
    ])
  ]
};
