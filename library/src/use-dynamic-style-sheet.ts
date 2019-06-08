import { useDarkModeContext } from './context'
import { DynamicStyleSheet } from './dynamic-style-sheet'

export function useDynamicStyleSheet<T>(dynamicStyleSheet: DynamicStyleSheet<T>) {
	const mode = useDarkModeContext()
	return dynamicStyleSheet[mode]
}
