const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// Emit the same standalone adapter in development and production. It must run
// after the CDN SDK and before the app bundle, not from inside the app bundle.
class PaddleCheckoutAssetPlugin {
  apply(compiler) {
    const name = 'PaddleCheckoutAssetPlugin';
    const sourcePath = path.join(paths.publicPath, 'paddle-checkout.js');
    compiler.hooks.thisCompilation.tap(name, (compilation) => {
      compilation.fileDependencies.add(sourcePath);
      compilation.hooks.processAssets.tap({
        name,
        stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
      }, () => {
        compilation.emitAsset('paddle-checkout.js',
          new compiler.webpack.sources.RawSource(fs.readFileSync(sourcePath)));
      });
    });
  }
}

module.exports = PaddleCheckoutAssetPlugin;
