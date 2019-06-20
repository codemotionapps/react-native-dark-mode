import { useDarkModeContext } from './context'
import { DynamicValue } from './dynamic-value'

export function useDynamicValue<T>(dynamic: DynamicValue<T>): T
export function useDynamicValue<T>(light: T, dark: T): T
export function useDynamicValue<T>(light: T | DynamicValue<T>, dark?: T): T {
	const mode = useDarkModeContext()
	if (light instanceof DynamicValue) {
		return light[mode]
	} else {
		return mode === 'dark' ? dark! : light
	}
}
