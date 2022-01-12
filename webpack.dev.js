const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          { 
            loader: 'css-loader',
            options: { 
              importLoaders: 2,
              sourceMap: true,
            } 
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
              },
              sourceMap: true,
            },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ]
  },

  devtool: 'inline-source-map',

  devServer: {
    static: './dist',
    client: { logging: 'none' },
    open: true,
    hot: true,
    liveReload: true,
    watchFiles: { paths: ['src/**/*'] },
  },
});