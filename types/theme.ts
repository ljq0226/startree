export type ThemeMode = 'dark' | 'light' | 'system'

export interface ThemeColors {
  '--theme-color-name': string

  '--c-primary': string
  '--c-primary-active': string
  '--c-primary-light': string
  '--c-primary-fade': string
  '--c-dark-primary': string
  '--c-dark-primary-active': string
  '--c-dark-primary-light': string
  '--c-dark-primary-fade': string

  '--rgb-primary': string
  '--rgb-dark-primary': string
}
