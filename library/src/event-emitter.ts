import { NativeEventEmitter } from 'react-native'

import { DarkModeEventEmitter } from './dark-mode-event-emitter'
import { NativeModule } from './native-module'

const nativeEventEmitter = new NativeEventEmitter(NativeModule)

export const eventEmitter = new DarkModeEventEmitter()

nativeEventEmitter.addListener('currentModeChanged', (newStyle) => {
	eventEmitter.emit('currentModeChanged', newStyle)
})
