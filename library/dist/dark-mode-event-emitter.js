import { EventEmitter } from 'events';
import { initialMode } from './initial-mode-wrapper';
export class DarkModeEventEmitter extends EventEmitter {
    constructor() {
        super();
        this.currentMode = initialMode;
        this.on('currentModeChanged', (mode) => {
            this.currentMode = mode;
        });
    }
}
//# sourceMappingURL=dark-mode-event-emitter.js.map