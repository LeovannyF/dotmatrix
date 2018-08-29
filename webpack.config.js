const path = require('path');

module.exports = {
 mode: 'development',
 entry: ['babel-polyfill', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
  	path: path.join(process.cwd(), './public'),
  	filename: 'bundle.js'
  }
};
