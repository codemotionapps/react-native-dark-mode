import { Mode } from './types'

export class DynamicColor {
	constructor(private readonly light: string, private readonly dark: string) { }

	getCurrentColor(mode: Mode) {
		return this[mode]
	}
}
