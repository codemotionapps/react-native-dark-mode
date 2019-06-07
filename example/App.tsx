import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { initialStyle, eventEmitter } from 'react-native-dark-mode'

interface Props {}
export default function App({}: Props) {
	const [ style, setStyle ] = useState(initialStyle)

	useEffect(() => {
		function handler(newStyle: typeof initialStyle) {
			setStyle(newStyle)
		}

		eventEmitter.on('currentStyleChanged', handler)
		return () => {
			eventEmitter.off('currentStyleChanged', handler)
		}
	}, [])

	return (
		<View style={[styles.container, { backgroundColor: style === 'dark' ? '#000000' : '#FFFFFF' }]}>
			<Text style={[styles.initialStyle, { color: style === 'dark' ? '#FFFFFF' : '#000000' }]}>
				Current style: {style}
			</Text>
		</View>
	)
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
