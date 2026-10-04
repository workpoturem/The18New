const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const stylesExtract = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(sc|sa|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },

    plugins: [new MiniCssExtractPlugin({
      filename: 'bundle.css',
    })],
  };
};

module.exports = stylesExtract;
