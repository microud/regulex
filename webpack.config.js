const path = require('path');

module.exports = {
  entry: './src/regulex.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "regulex.min.js"
  }
};
