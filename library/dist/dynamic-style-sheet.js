import { StyleSheet } from 'react-native';
import { DynamicValue } from './dynamic-value';
function parseStylesFor(styles, mode) {
    const newStyles = {};
    for (const i in styles) {
        const style = styles[i];
        const newStyle = {};
        for (const i in style) {
            const value = style[i];
            newStyle[i] = value instanceof DynamicValue ? value[mode] : value;
        }
        newStyles[i] = newStyle;
    }
    return newStyles;
}
export class DynamicStyleSheet {
    constructor(styles) {
        this.dark = StyleSheet.create(parseStylesFor(styles, 'dark'));
        this.light = StyleSheet.create(parseStylesFor(styles, 'light'));
    }
}
//# sourceMappingURL=dynamic-style-sheet.js.map