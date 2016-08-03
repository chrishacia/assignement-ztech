const fs = require('fs');
const os = require('os');
const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const files = fs.readdirSync('./src/scripts/').filter(function (file) {
  return path.extname(file) === '.js';
});

const entries = files.reduce(function (obj, file, index) {
  const key = path.basename(file, '.js');
  obj[key] = [
    './src/scripts/' + key
  ];
  return obj;
}, {});

const outputScriptsDir = 'dist/scripts/'

// chunkName: 'vendor'
entries.vendor = [
    'jquery',
    'underscore',
    'bootstrap-sass',
    'backbone',
    'moment',
    'react',
    'react-dom'
];

module.exports = {
  devtool: 'eval',
  entry: entries,
  output: {
    filename: outputScriptsDir + '[name].js'
  },
  plugins: [
    // eg:  new webpack.optimize.CommonsChunkPlugin('dist/scripts/init.js'),
    new webpack.optimize.CommonsChunkPlugin(
        /* chunkName= */
        'vendor',
        /* filename= */
        outputScriptsDir + 'vendor.js'
    ),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new BrowserSyncPlugin({
      proxy: {
        // hostname example: sub1.chacia.com
        target: 'https://' + os.hostname(),
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
        query: {
          presets:['react']
        }
      }
    ]
  }
};
