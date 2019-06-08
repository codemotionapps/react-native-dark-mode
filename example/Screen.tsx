import React from 'react'
import { View, Text } from 'react-native'
import { useDarkModeContext, Dynamic, useDynamicStyleSheet, DynamicStyleSheet, DarkModeContextProvider } from 'react-native-dark-mode'

import Extra from './Extra'

export default function Screen() {
	const mode = useDarkModeContext()
	const styles = useDynamicStyleSheet(dynamicStyles)
	return <View style={styles.container}>
		<Text style={styles.initialStyle}>
			Current mode: {mode}
		</Text>

		<DarkModeContextProvider value="dark">
			<Extra />
		</DarkModeContextProvider>
		<DarkModeContextProvider value="light">
			<Extra />
		</DarkModeContextProvider>
	</View>
}

const dynamicStyles = new DynamicStyleSheet({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: new Dynamic('#FFFFFF', '#000000')
	},
	initialStyle: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: new Dynamic('#000000', '#FFFFFF'),
	},
})
