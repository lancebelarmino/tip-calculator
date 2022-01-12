const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.bundle.js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(jpg|jpg|webp|png|svg|ico|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    // Duplicate new HtmlWebpackPlugin() to create new html file
    new HtmlWebpackPlugin({
      title: 'Frontend Mentor | Tip calculator app',
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
      inject: 'body',
      minify: false,
    }),
  ],
};
