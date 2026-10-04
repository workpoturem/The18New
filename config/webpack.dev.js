const { merge } = require('webpack-merge');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const server = require('./modules/server');
const styles = require('./modules/styles');
const common = require('./webpack.common');

const devConfig = merge(
  common,
  {
    mode: 'development',

    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
      ],
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  },

  server(),
  styles()
);

module.exports = devConfig;