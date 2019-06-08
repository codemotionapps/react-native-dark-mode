import React, { createContext, useContext, useState, useEffect } from 'react'

import { eventEmitter } from './event-emitter'
import { initialStyle } from './initial-style'
import { Mode } from './types'

export const DarkModeContext = createContext<Mode>('light')
DarkModeContext.displayName = 'DarkModeContext'

interface IProps {
	children: JSX.Element
}
export function DarkModeContextProvider({ children }: IProps) {
	const [ currentStyle, setCurrentStyle ] = useState<Mode>(initialStyle)

	useEffect(() => {
		function handler(mode: Mode) {
			setCurrentStyle(mode)
		}

		eventEmitter.on('currentModeChanged', handler)
		return () => {
			eventEmitter.off('currentModeChanged', handler)
		}
	}, [])

	return <DarkModeContext.Provider value={currentStyle}>
		{children}
	</DarkModeContext.Provider>
}

export function useDarkModeContext() {
	return useContext(DarkModeContext)
}
