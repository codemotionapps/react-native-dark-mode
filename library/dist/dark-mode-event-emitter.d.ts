import { EventEmitter } from 'events';
import { Mode } from './types';
export declare interface DarkModeEventEmitter {
    on(event: 'currentModeChanged', listener: (mode: Mode) => void): this;
    once(event: 'currentModeChanged', listener: (mode: Mode) => void): this;
    emit(event: 'currentModeChanged', mode: Mode): boolean;
}
export declare class DarkModeEventEmitter extends EventEmitter {
    currentMode: Mode;
    constructor();
}
