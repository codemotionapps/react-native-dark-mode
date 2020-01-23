import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { IndexedObject, ValueOf } from 'toolkit.ts'

import { DynamicValue } from './dynamic-value'
import { Mode } from './types'


type Style = ViewStyle | TextStyle | ImageStyle

type DynamicStyle<T extends Style> = { [Key in keyof T]: T[Key] | DynamicValue<T[Key]> }
type DynamicStyles<T> = { [P in keyof T]: DynamicStyle<Style> }

type NormalizeStyle<T> = T extends DynamicStyle<infer R> ? R : T
export type NormalizeStyles<T extends DynamicStyles<T>> = { [Key in keyof T]: NormalizeStyle<T[Key]> }
						
export type DynamicViewStyle = DynamicStyle<ViewStyle>
export type DynamicTextStyle = DynamicStyle<TextStyle>
export type DynamicImageStyle = DynamicStyle<ImageStyle>
						

function parseStylesFor<T extends DynamicStyles<T>>(styles: T, mode: Mode): NormalizeStyles<T> {
	const newStyles: IndexedObject<IndexedObject<ValueOf<ValueOf<T>>>> = {}

	for (const i in styles) {
		const style = styles[i]
		const newStyle: IndexedObject<ValueOf<ValueOf<T>>> = {}
		for (const i in style) {
			const value = style[i]
			newStyle[i] = value instanceof DynamicValue ? value[mode] : value
		}
		newStyles[i] = newStyle
	}

	return newStyles as unknown as NormalizeStyles<T>
}

export class DynamicStyleSheet<T extends DynamicStyles<T>> {
	public readonly dark: NormalizeStyles<T>
	public readonly light: NormalizeStyles<T>

	constructor(styles: T) {
		this.dark = StyleSheet.create(parseStylesFor(styles, 'dark')) as NormalizeStyles<T>
		this.light = StyleSheet.create(parseStylesFor(styles, 'light')) as NormalizeStyles<T>
	}
}
