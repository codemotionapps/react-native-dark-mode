import { useDarkModeContext } from './context'
import { Dynamic } from './dynamic'

function useDynamic<T>(dynamic: Dynamic<T>): T
function useDynamic<T>(light: T, dark: T): T
function useDynamic<T>(light: T | Dynamic<T>, dark?: T): T {
	const mode = useDarkModeContext()
	if (light instanceof Dynamic) {
		return light[mode]
	} else {
		return mode === 'dark' ? dark! : light
	}
}

export { useDynamic }
