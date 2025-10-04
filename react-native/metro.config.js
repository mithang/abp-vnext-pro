const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Fix for Node.js 23 compatibility
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.resolver.sourceExts = ['js', 'jsx', 'ts', 'tsx', 'json', 'cjs'];

// Add resolver for @swc/helpers
config.resolver.alias = {
  '@swc/helpers': path.resolve(__dirname, 'node_modules/@swc/helpers'),
};

module.exports = config;