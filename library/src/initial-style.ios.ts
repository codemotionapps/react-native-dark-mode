import { NativeModule } from './native-module'
import { Mode } from './types'

export const initialStyle: Mode = NativeModule.getCurrentMode()
