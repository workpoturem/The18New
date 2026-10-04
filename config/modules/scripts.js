const scripts = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(jsx|js)?$/,
          use: 'babel-loader',
          exclude: '/node_modules/',
        },
      ],
    },
  };
};

module.exports = scripts;
