import { useDarkModeContext } from './context'
import { DynamicValue } from './dynamic-value'

function useDynamicValue<T>(dynamic: DynamicValue<T>): T
function useDynamicValue<T>(light: T, dark: T): T
function useDynamicValue<T>(light: T | DynamicValue<T>, dark?: T): T {
	const mode = useDarkModeContext()
	if (light instanceof DynamicValue) {
		return light[mode]
	} else {
		return mode === 'dark' ? dark! : light
	}
}

export { useDynamicValue }
