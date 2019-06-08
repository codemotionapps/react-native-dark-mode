import React from 'react'
import { DarkModeContextProvider } from 'react-native-dark-mode'

import Screen from './Screen'

export default function App() {
	return (
		<DarkModeContextProvider>
			<Screen />
		</DarkModeContextProvider>
	)
}
