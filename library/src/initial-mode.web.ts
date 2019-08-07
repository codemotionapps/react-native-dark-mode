import { Mode } from './types'

const isDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
const isNoPreferenceQuery = window.matchMedia('(prefers-color-scheme: no-preference)');
const isLightQuery = window.matchMedia('(prefers-color-scheme: light)');

//should match one of the three
const isSupported = isDarkQuery.matches || isNoPreferenceQuery.matches || isLightQuery.matches;

export const initialMode: Mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
export const supportsDarkMode: boolean = isSupported //TODO: add check?
