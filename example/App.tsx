import React, { useState, useCallback } from 'react'
import { View, Text, Image, Button, TouchableOpacity, Alert } from 'react-native'
import {
	useDarkModeContext,
	DynamicValue,
	useDynamicStyleSheet,
	DynamicStyleSheet,
	DarkModeProvider,
	useDynamicValue,
	eventEmitter,
	getCurrentMode,
} from 'react-native-dark-mode'

import Extra from './Extra'

function Counter() {
	const [counter, setCounter] = useState(0)
	return <Button title={counter.toString()} onPress={() => setCounter((i) => i + 1)} />
}

eventEmitter.on('currentModeChanged', (newMode) => console.log(newMode))

export default function App() {
	const mode = useDarkModeContext()
	const styles = useDynamicStyleSheet(dynamicStyles)
	const logo = useDynamicValue(require('./logoLight.png'), require('./logoDark.png'))

	const onPressCurrentModeSync = useCallback(() => {
		const currentMode = getCurrentMode()
		Alert.alert('Current mode by synchronous method:', currentMode)
	}, [])

	return (
		<View style={styles.container}>
			<Image source={require('./meme.png')} style={styles.meme} />

			<Image source={logo} style={styles.image} />

			<Text style={styles.initialStyle}>Current mode: {mode}</Text>

			<TouchableOpacity onPress={onPressCurrentModeSync}>
				<Text style={styles.getCurrentMode}>Tap here to get current mode</Text>
			</TouchableOpacity>

			<DarkModeProvider mode="dark">
				<Extra />
			</DarkModeProvider>
			<DarkModeProvider mode="light">
				<Extra />
			</DarkModeProvider>

			{/* <Counter /> */}
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
	getCurrentMode: {
		fontSize: 16,
		textAlign: 'center',
		paddingBottom: 20,
		color: new DynamicValue('#000000', '#FFFFFF'),
	},
	image: {
		borderWidth: 1,
		borderColor: new DynamicValue('#000000', '#FFFFFF'),
		width: 80,
		height: 80,
	},
	meme: {
		width: '100%',
		height: 200,
		marginBottom: 20,
	},
})
