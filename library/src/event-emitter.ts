import { EventEmitter } from 'events'
import { NativeEventEmitter } from 'react-native'

import { NativeModule } from './native-module'
import { Mode } from './types'

const nativeEventEmitter = new NativeEventEmitter(NativeModule)

declare interface DarkModeEventEmitter {
	on(event: 'currentModeChanged', listener: (mode: Mode) => void): this
	once(event: 'currentModeChanged', listener: (mode: Mode) => void): this
	emit(event: 'currentModeChanged', mode: Mode): boolean
}

class DarkModeEventEmitter extends EventEmitter {

}

export const eventEmitter = new DarkModeEventEmitter()

nativeEventEmitter.addListener('currentModeChanged', (newStyle) => {
	eventEmitter.emit('currentModeChanged', newStyle)
})
