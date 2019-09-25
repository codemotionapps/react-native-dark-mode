import { Platform } from 'react-native';
import { NativeModule } from './native-module'
import { Mode } from './types'

export const initialMode: Mode = NativeModule.initialMode
export const supportsDarkMode: boolean = NativeModule.supportsDarkMode && Platform.Version >= 29;
