import { Context } from 'react';
import { Mode } from './types';
declare type ContextType = Mode | 'current';
export declare const DarkModeContext: Context<ContextType>;
interface IProps {
    mode?: Mode;
    children: JSX.Element;
}
export declare function DarkModeProvider({ children, mode }: IProps): JSX.Element;
export declare function useDarkModeContext(): Mode;
export {};
