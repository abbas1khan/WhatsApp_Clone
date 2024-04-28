const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);



// const { getDefaultConfig } = require('expo/metro-config');
// const { mergeConfig } = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://facebook.github.io/metro/docs/configuration
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {
//     // Add any additional configurations specific to your project here
// };

// module.exports = (async () => {
//     const defaultConfig = await getDefaultConfig(__dirname);
//     return mergeConfig(defaultConfig, config);
// })();




// const { getDefaultConfig } = require('expo/metro-config');
// const { mergeConfig } = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://facebook.github.io/metro/docs/configuration
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
