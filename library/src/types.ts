export type Mode = 'light' | 'dark'

declare global {
  interface MatchMediaEvent {
    matches: boolean
  }

  interface MatchMedia {
    addListener: (callback: (e: MatchMediaEvent) => void) => void
    matches: boolean
  }

  interface Window {
    matchMedia: (mediaQuery: string) => MatchMedia;
  }

  let window: Window
}
