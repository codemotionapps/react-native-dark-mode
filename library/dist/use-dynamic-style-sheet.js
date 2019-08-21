import { useDarkModeContext } from './context';
export function useDynamicStyleSheet(dynamicStyleSheet) {
    const mode = useDarkModeContext();
    return dynamicStyleSheet[mode];
}
//# sourceMappingURL=use-dynamic-style-sheet.js.map