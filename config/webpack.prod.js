const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common');
const stylesExtract = require('./modules/styles.extract');

const prodConfig = merge(
  common,
  {
    mode: 'production',

    devtool: false,

    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin(),
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
    ],
  },

  stylesExtract(),
);

module.exports = prodConfig;
