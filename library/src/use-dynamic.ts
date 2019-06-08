import { useDarkModeContext } from './context'
import { Dynamic } from './dynamic'

export function useDynamic<T>(dynamic: Dynamic<T>): T {
	const mode = useDarkModeContext()
	return dynamic[mode]
}
