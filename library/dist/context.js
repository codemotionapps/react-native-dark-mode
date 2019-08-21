import React, { createContext, useContext, useState, useEffect } from 'react';
import { eventEmitter } from './event-emitter-wrapper';
export const DarkModeContext = createContext('current');
DarkModeContext.displayName = 'DarkModeContext';
function useCurrentMode(forcedMode) {
    const [currentMode, setCurrentMode] = useState(eventEmitter.currentMode);
    useEffect(() => {
        if (forcedMode)
            return;
        if (currentMode !== eventEmitter.currentMode) {
            setCurrentMode(eventEmitter.currentMode);
        }
        function handler(mode) {
            setCurrentMode(mode);
        }
        eventEmitter.on('currentModeChanged', handler);
        return () => {
            eventEmitter.off('currentModeChanged', handler);
        };
    }, [currentMode, forcedMode]);
    return currentMode;
}
export function DarkModeProvider({ children, mode }) {
    const currentMode = useCurrentMode(mode);
    return React.createElement(DarkModeContext.Provider, { value: mode || currentMode }, children);
}
export function useDarkModeContext() {
    const context = useContext(DarkModeContext);
    const currentMode = useCurrentMode(context === 'current' ? undefined : context);
    if (context === 'current') {
        return currentMode;
    }
    return context;
}
//# sourceMappingURL=context.js.map