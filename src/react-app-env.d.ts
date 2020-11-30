/// <reference types="react-scripts" />
interface Window {
  tableau: unknown
}
// To remove typescript false error on import of SCSS.
// See:https://medium.com/@thetrevorharmon/how-to-silence-false-sass-warnings-in-react-16d2a7158aff
declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}

declare module '*.png'
declare module '*.svg'
