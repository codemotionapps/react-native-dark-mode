import { NativeEventEmitter } from 'react-native'

import { DarkModeEventEmitter } from './dark-mode-event-emitter'

export const eventEmitter = new DarkModeEventEmitter()


var isDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

isDarkQuery.addListener((e) => {
	eventEmitter.emit('currentModeChanged', e.matches ? 'dark' : 'light')
})
