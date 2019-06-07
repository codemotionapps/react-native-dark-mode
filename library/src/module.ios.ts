import { NativeModule } from './native-module'
import { nativeEventEmitter } from './event-emitter'

export const initialStyle: 'light' | 'dark' = NativeModule.getCurrentStyle()

export { eventEmitter } from './event-emitter'
