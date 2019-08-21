import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { DynamicValue } from './dynamic-value';
declare type Style = ViewStyle | TextStyle | ImageStyle;
declare type DynamicStyle<T extends Style> = {
    [Key in keyof T]: T[Key] | DynamicValue<T[Key]>;
};
declare type DynamicStyles<T> = {
    [P in keyof T]: DynamicStyle<Style>;
};
declare type NormalizeStyle<T> = T extends DynamicStyle<infer R> ? R : T;
export declare type NormalizeStyles<T extends DynamicStyles<T>> = {
    [Key in keyof T]: NormalizeStyle<T[Key]>;
};
export declare class DynamicStyleSheet<T extends DynamicStyles<T>> {
    readonly dark: NormalizeStyles<T>;
    readonly light: NormalizeStyles<T>;
    constructor(styles: T);
}
export {};
