const path = require('path')

const blacklist = require('metro-config/src/defaults/blacklist')

const libraryPath = path.resolve(__dirname, '..', 'library')

module.exports = {
	watchFolders: [path.resolve(__dirname, 'node_modules'), libraryPath],
	resolver: {
		blacklistPE: blacklist([
			new RegExp(`${libraryPath}/node_modules/react-native/.*`),
		]),
	},
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: false,
			},
		}),
	},
}
