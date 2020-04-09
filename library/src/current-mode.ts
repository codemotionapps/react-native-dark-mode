import { NativeModule } from './native-module'
import { Mode } from './types'
import { initialMode } from './initial-mode'

declare var global: {
	nativeExtensions: boolean
	nativeCallSyncHook: boolean
	RN$Bridgeless: boolean
}

export const getCurrentMode = (): Mode => {
	if (__DEV__ && !global.nativeExtensions && !global.nativeCallSyncHook && !global.RN$Bridgeless) {
		// Hard code initial mode when using the async debugger as
		// sync calls aren't supported

		return initialMode
	}

	return NativeModule.getCurrentMode()
}
