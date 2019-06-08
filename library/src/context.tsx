import React, { createContext, useContext, useState, useEffect } from 'react'

import { eventEmitter } from './event-emitter'
import { initialMode } from './initial-mode'
import { Mode } from './types'

export const DarkModeContext = createContext<Mode>('light')
DarkModeContext.displayName = 'DarkModeContext'

interface IProps {
	mode?: Mode
	children: JSX.Element
}
export function DarkModeProvider({ children, mode }: IProps) {
	const [ currentMode, setCurrentMode ] = useState<Mode>(initialMode)

	useEffect(() => {
		if (mode) return
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
	}, [currentMode, mode])

	return <DarkModeContext.Provider value={mode || currentMode}>
		{children}
	</DarkModeContext.Provider>
}

export function useDarkModeContext() {
	return useContext(DarkModeContext)
}
