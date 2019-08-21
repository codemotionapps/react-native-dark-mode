import { useDarkModeContext } from './context';
import { DynamicValue } from './dynamic-value';
export function useDynamicValue(light, dark) {
    const mode = useDarkModeContext();
    if (light instanceof DynamicValue) {
        return light[mode];
    }
    else {
        return mode === 'dark' ? dark : light;
    }
}
//# sourceMappingURL=use-dynamic-value.js.map