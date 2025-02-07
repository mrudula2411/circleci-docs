const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    app: './src-js/app.js',
    vendor: './src-js/vendor.js'
  },
  output: {
    path: path.join(__dirname, 'jekyll/assets/js'),
    publicPath: '',
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      CIRCLECI_ENVIRONMENT: `"${process.env.NODE_ENV}"`
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
