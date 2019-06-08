import React, { createContext, useContext, useState, useEffect } from 'react'

import { eventEmitter } from './event-emitter'
import { initialMode } from './initial-mode'
import { Mode } from './types'

export const DarkModeContext = createContext<Mode>('light')
DarkModeContext.displayName = 'DarkModeContext'

interface IProps {
	value?: Mode
	children: JSX.Element
}
export function DarkModeContextProvider({ children, value }: IProps) {
	const [ currentMode, setCurrentMode ] = useState<Mode>(initialMode)

	useEffect(() => {
		if (value) return
		if (currentMode !== eventEmitter.currentMode) {
			setCurrentMode(eventEmitter.currentMode)
		}

		function handler(mode: Mode) {
			setCurrentMode(mode)
		}

		eventEmitter.on('currentModeChanged', handler)
		return () => {
			eventEmitter.off('currentModeChanged', handler)
		}
	}, [currentMode, value])

	return <DarkModeContext.Provider value={value || currentMode}>
		{children}
	</DarkModeContext.Provider>
}

export function useDarkModeContext() {
	return useContext(DarkModeContext)
}
