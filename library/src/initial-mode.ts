import { NativeModule } from './native-module'
import { Mode } from './types'

export const initialMode: Mode = NativeModule.initialMode
export const currentMode: Mode = NativeModule.currentMode
export const supportsDarkMode: boolean = NativeModule.supportsDarkMode
