const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [ 
          MiniCssExtractPlugin.loader,
          { 
            loader: 'css-loader',
            options: { importLoaders: 2 } 
          },
          { 
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions',
                    },
                  ],
                ],
              }
            },
          },
          { loader: 'sass-loader' },
        ],
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'main',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ]
});