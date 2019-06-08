import { EventEmitter } from 'events'

import { initialMode } from './initial-mode'
import { Mode } from './types'

export declare interface DarkModeEventEmitter {
	on(event: 'currentModeChanged', listener: (mode: Mode) => void): this
	once(event: 'currentModeChanged', listener: (mode: Mode) => void): this
	emit(event: 'currentModeChanged', mode: Mode): boolean
}

export class DarkModeEventEmitter extends EventEmitter {
	public currentMode: Mode = initialMode

	constructor() {
		super()

		this.on('currentModeChanged', (mode) => {
			this.currentMode = mode
		})
	}
}
