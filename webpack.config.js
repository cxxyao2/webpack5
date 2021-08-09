const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: path.resolve(__dirname, 'loaders', 'loader1'),
      },
    ],
  },

  mode: 'production',
};
