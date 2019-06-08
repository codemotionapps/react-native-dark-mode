import { StyleSheet, ViewStyle, TextStyle, ImageStyle  } from 'react-native'
import { IndexedObject, ValueOf } from 'toolkit.ts'

import { Dynamic } from './dynamic'
import { Mode } from './types'

type Style = ViewStyle | TextStyle | ImageStyle
type Styles = IndexedObject<Style>

type DynamicStyle<T extends Style> = { [Key in keyof T]: T[Key] | Dynamic<T[Key]> }
type DynamicStyles = IndexedObject<DynamicStyle<ViewStyle | TextStyle | ImageStyle>>

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
	return key in obj
}

function parseStylesFor(styles: DynamicStyles, mode: Mode): Styles {
	const newStyles: Styles = {}

	for (const i in styles) {
		const style = styles[i]
		const newStyle: IndexedObject<ValueOf<Style>> = {}
		for (const i in style) {
			if (hasKey(style, i)) {
				const value = style[i]
				newStyle[i] = value instanceof Dynamic ? value[mode] : value
			}
		}
		newStyles[i] = newStyle
	}

	return newStyles
}

export class DynamicStyleSheet {
	public readonly dark: Styles
	public readonly light: Styles

	constructor(styles: DynamicStyles) {
		this.dark = StyleSheet.create(parseStylesFor(styles, 'dark'))
		this.light = StyleSheet.create(parseStylesFor(styles, 'light'))
	}
}
