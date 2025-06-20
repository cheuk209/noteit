const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://metrobundler.dev/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}r
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);