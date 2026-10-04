const paths = require('./paths');

const server = () => {
  return {
    devServer: {
      static: {
        directory: paths.outputPath,
      },
      port: 3030,
      historyApiFallback: true,
      compress: true,
      hot: true,
    },
  };
};

module.exports = server;
