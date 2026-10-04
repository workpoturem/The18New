const assets = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'index/[name][ext]',
          },
        },
        {
          test: /\.(svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'icons/[name][ext]',
          },
        },
      ],
    },
  };
};

module.exports = assets;
