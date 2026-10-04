const path = require('path');

const paths = {
  root: path.resolve(__dirname, '../../'),
  outputPath: path.resolve(__dirname, '../../', 'build'),
  entryPath: path.resolve(__dirname, '../../', 'src'),
  publicPath: path.resolve(__dirname, '../../', 'public'),
  templatePath: path.resolve(__dirname, '../../', 'src/template.html'),
  imagesPath: path.resolve(__dirname, '../../', 'src/images'),
  iconsPath: path.resolve(__dirname, '../../', 'src/icons'),
};

module.exports = paths;