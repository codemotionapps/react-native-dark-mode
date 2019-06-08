module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		['module-resolver', {
			root: ['.'],
			alias: {
				'react-native-dark-mode': '../library/src',
				'react': './node_modules/react',
			},
		}],
	],
}
