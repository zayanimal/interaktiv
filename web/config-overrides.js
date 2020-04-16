const path = require('path');
const { addWebpackAlias } = require('customize-cra');

module.exports = function override(config) {
  config = addWebpackAlias({
    '@': path.resolve(__dirname, 'src', 'src'),
    '@api': path.resolve(__dirname, 'src', 'api'),
    '@store': path.resolve(__dirname, 'src', 'store'),
    '@actions': path.resolve(__dirname, 'src', 'store/actions'),
    '@selectors': path.resolve(__dirname, 'src', 'store/selectors'),
    '@images': path.resolve(__dirname, 'src', 'assets/images'),
    '@icons': path.resolve(__dirname, 'src', 'assets/icons'),
    '@components': path.resolve(__dirname, 'src', 'components'),
    '@containers': path.resolve(__dirname, 'src', 'containers'),
    '@views': path.resolve(__dirname, 'src', 'views'),
    '@utils': path.resolve(__dirname, 'src', 'utils'),
    '@styles': path.resolve(__dirname, 'src', 'styles')
  })(config);

  return config;
};
