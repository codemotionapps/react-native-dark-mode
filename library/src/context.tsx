import React, { createContext, useContext, useState, useEffect, Context, ReactNode } from 'react'

import { eventEmitter } from './event-emitter'
import { Mode } from './types'

type ContextType = Mode | 'current'
export const DarkModeContext: Context<ContextType> = createContext<ContextType>('current')
DarkModeContext.displayName = 'DarkModeContext'

interface IProps {
	mode?: Mode
	children: ReactNode
}

function useCurrentMode(forcedMode?: Mode) {
	const [ currentMode, setCurrentMode ] = useState<Mode>(eventEmitter.currentMode)

	useEffect(() => {
		if (forcedMode) return
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
	}, [currentMode, forcedMode])

	return currentMode
}

export function DarkModeProvider({ children, mode }: IProps) {
	const currentMode = useCurrentMode(mode)

	return <DarkModeContext.Provider value={mode || currentMode}>
		{children}
	</DarkModeContext.Provider>
}

export function useDarkModeContext(): Mode {
	const context = useContext(DarkModeContext)
	const currentMode = useCurrentMode(context === 'current' ? undefined : context)

	if (context === 'current') {
		return currentMode
	}

	return context
}
