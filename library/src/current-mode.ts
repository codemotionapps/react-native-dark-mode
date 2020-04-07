import { NativeModule } from './native-module'
import { Mode } from './types'

export const getCurrentMode = (): Mode => NativeModule.getCurrentMode()
