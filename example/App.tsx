import React from 'react'
import { DarkModeProvider } from 'react-native-dark-mode'

import Screen from './Screen'

export default function App() {
	return (
		<DarkModeProvider>
			<Screen />
		</DarkModeProvider>
	)
}
