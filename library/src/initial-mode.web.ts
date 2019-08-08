import { Mode } from './types'

const isDarkQuery = window.matchMedia('(prefers-color-scheme: dark)')
const isNoPreferenceQuery = window.matchMedia('(prefers-color-scheme: no-preference)')
const isLightQuery = window.matchMedia('(prefers-color-scheme: light)')

// Should match one of the three
const isSupported = isDarkQuery.matches || isNoPreferenceQuery.matches || isLightQuery.matches

export const initialMode: Mode = isDarkQuery.matches ? 'dark' : 'light'
export const supportsDarkMode = isSupported
