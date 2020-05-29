import { NativeModule } from './native-module'
import { Mode } from './types'

export const initialMode: Mode = (NativeModule && NativeModule.initialMode) || 'light'
export const supportsDarkMode: boolean = (NativeModule && NativeModule.supportsDarkMode) || false
