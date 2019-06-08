import { useDarkModeContext } from './context'
import { DynamicStyleSheet } from './dynamic-style-sheet'

export function useDynamicStyleSheet(dynamicStyleSheet: DynamicStyleSheet) {
	const mode = useDarkModeContext()
	return dynamicStyleSheet[mode]
}
