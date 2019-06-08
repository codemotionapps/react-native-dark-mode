import { useDarkModeContext } from './context'
import { DynamicColor } from './dynamic-color'

export function useDynamicColor(color: DynamicColor) {
	const mode = useDarkModeContext()
	return color.getCurrentColor(mode)
}
