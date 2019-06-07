import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { initialStyle } from 'react-native-dark-mode'

interface Props {}
export default function App({}: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.initialStyle}>Initial style: {initialStyle}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	initialStyle: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
})
