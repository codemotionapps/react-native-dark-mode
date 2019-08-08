import React from 'react'
import { View, Text, Image } from 'react-native'
import {
	useDarkModeContext,
	DynamicValue,
	useDynamicStyleSheet,
	DynamicStyleSheet,
	DarkModeProvider,
	useDynamicValue,
} from 'react-native-dark-mode'

import Extra from './Extra'

export default function App() {
	const mode = useDarkModeContext()
	const styles = useDynamicStyleSheet(dynamicStyles)
	const logo = useDynamicValue(require('./logoLight.png'), require('./logoDark.png'))

	return (
		<View style={styles.container}>
			<Image source={logo} style={styles.image} />

			<Text style={styles.initialStyle}>Current mode: {mode}</Text>

			<DarkModeProvider mode="dark">
				<Extra />
			</DarkModeProvider>
			<DarkModeProvider mode="light">
				<Extra />
			</DarkModeProvider>
		</View>
	)
}

const dynamicStyles = new DynamicStyleSheet({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: new DynamicValue('#FFFFFF', '#000000'),
	},
	initialStyle: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: new DynamicValue('#000000', '#FFFFFF'),
	},
	image: {
		borderWidth: 1,
		borderColor: new DynamicValue('#000000', '#FFFFFF'),
		width: 80,
		height: 80,
	},
})
