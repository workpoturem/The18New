const webpack = require('webpack');
const { merge } = require('webpack-merge');
const WindiCSS = require('windicss-webpack-plugin')
const paths = require('./modules/paths');
const scripts = require('./modules/scripts');
const htmlExtract = require('./modules/html.extract')
const assetsExtract = require('./modules/assets.extract');
const PaddleCheckoutAssetPlugin = require('./modules/paddle-checkout');

const commonConfig = merge(
  {
    entry: [paths.root],
    output: {
      path: paths.outputPath,
      filename: 'bundle.js',
      publicPath: '/',
    },

    target: 'web',

    resolve: {
      modules: [paths.entryPath, 'node_modules'],
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': paths.entryPath,
        '@components': `${paths.entryPath}/components`,
        '@containers': `${paths.entryPath}/containers`,
        '@pages': `${paths.entryPath}/pages`,
        '@styles': `${paths.entryPath}/styles`,
        '@routes': `${paths.entryPath}/routes`,
        '@utils': `${paths.entryPath}/utils`,
        '@images': `${paths.imagesPath}`,
        '@icons': `${paths.iconsPath}`,
      },
    },

    plugins: [
      new PaddleCheckoutAssetPlugin(),
      new webpack.ProgressPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new WindiCSS(),
    ],
  },

  scripts(),
  htmlExtract(),
  assetsExtract(),
);

module.exports = commonConfig;
