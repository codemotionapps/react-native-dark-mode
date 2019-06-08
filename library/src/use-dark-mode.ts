import { useDarkModeContext } from './context'

export function useDarkMode() {
	return useDarkModeContext() === 'dark'
}
