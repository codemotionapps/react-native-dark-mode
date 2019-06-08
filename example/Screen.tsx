import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useDarkModeContext, DynamicColor, useDynamicColor } from 'react-native-dark-mode'

const labelDynamicColor = new DynamicColor('#000000', '#FFFFFF')
const backgroundDyanmicColor = new DynamicColor('#FFFFFF', '#000000')

export default function Screen() {
	const style = useDarkModeContext()
	const color = useDynamicColor(labelDynamicColor)
	const backgroundColor = useDynamicColor(backgroundDyanmicColor)
	return <View style={[styles.container, { backgroundColor }]}>
		<Text style={[styles.initialStyle, { color }]}>
			Current style: {style}
		</Text>
	</View>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	initialStyle: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
})
