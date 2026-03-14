const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Remove ModuleScopePlugin to allow imports outside src
      // Used to import files from the shared module.
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        plugin => plugin.constructor.name !== 'ModuleScopePlugin'
      );

      // Include the shared directory in babel-loader so TypeScript files
      // outside src/ are transpiled correctly.
      const sharedDir = path.resolve(__dirname, '..', 'shared');
      const babelLoaderRule = webpackConfig.module.rules
        .find(rule => Array.isArray(rule.oneOf))
        .oneOf.find(rule => rule.loader && rule.loader.includes('babel-loader') && !rule.exclude);

      if (babelLoaderRule) {
        babelLoaderRule.include = Array.isArray(babelLoaderRule.include)
          ? [...babelLoaderRule.include, sharedDir]
          : [babelLoaderRule.include, sharedDir];
      }

      return webpackConfig;
    }
  }
};
