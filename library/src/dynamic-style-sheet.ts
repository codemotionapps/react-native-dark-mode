import { StyleSheet, ViewStyle, TextStyle, ImageStyle  } from 'react-native'
import { IndexedObject, ValueOf } from 'toolkit.ts'

import { Dynamic } from './dynamic'
import { Mode } from './types'

type Named<T, K> = { [P in keyof T]: K }

type Style = ViewStyle | TextStyle | ImageStyle
type Styles<T> = Named<T, Style>

type DynamicStyle<T extends Style> = { [Key in keyof T]: T[Key] | Dynamic<T[Key]> }
type DynamicStyles<T> = Named<T, DynamicStyle<ViewStyle | TextStyle | ImageStyle>>

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
	return key in obj
}

function parseStylesFor<T>(styles: DynamicStyles<T>, mode: Mode): Styles<T> {
	const newStyles: Styles<any> = {}

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

export class DynamicStyleSheet<T> {
	public readonly dark: Styles<T>
	public readonly light: Styles<T>

	constructor(styles: DynamicStyles<T>) {
		this.dark = StyleSheet.create(parseStylesFor(styles, 'dark'))
		this.light = StyleSheet.create(parseStylesFor(styles, 'light'))
	}
}
