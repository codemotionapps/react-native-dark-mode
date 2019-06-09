import { useDarkModeContext } from './context'
import { DynamicStyleSheet, NormalizeStyles } from './dynamic-style-sheet'

export function useDynamicStyleSheet<T>(dynamicStyleSheet: DynamicStyleSheet<T>): NormalizeStyles<T> {
	const mode = useDarkModeContext()
	return dynamicStyleSheet[mode]
}
