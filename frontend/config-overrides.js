const path = require('path');
const { addWebpackAlias } = require('customize-cra');

module.exports = function override(config) {
    return addWebpackAlias({
        '@/': path.resolve(__dirname, 'src', 'src'),
        '@config': path.resolve(__dirname, 'src', 'config'),
        '@shared': path.resolve(__dirname, 'src', 'modules/shared'),
        '@admin': path.resolve(__dirname, 'src', 'modules/admin'),
        '@customer': path.resolve(__dirname, 'src', 'modules/customer'),
        '@system': path.resolve(__dirname, 'src', 'modules/system'),
        '@images': path.resolve(__dirname, 'src', 'assets/images'),
        '@icons': path.resolve(__dirname, 'src', 'assets/icons'),
        '@utils': path.resolve(__dirname, 'src', 'utils'),
        '@styles': path.resolve(__dirname, 'src', 'styles')
    })(config);
};
