import { DynamicValue } from './dynamic-value';
export declare function useDynamicValue<T>(dynamic: DynamicValue<T>): T;
export declare function useDynamicValue<T>(light: T, dark: T): T;
