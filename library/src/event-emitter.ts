import { EventEmitter } from 'events'
import { NativeEventEmitter } from 'react-native'

import { NativeModule } from './native-module'

export const nativeEventEmitter = new NativeEventEmitter(NativeModule)

export const eventEmitter = new EventEmitter()

nativeEventEmitter.addListener('currentStyleChanged', (newStyle) => {
	eventEmitter.emit('currentStyleChanged', newStyle)
})
