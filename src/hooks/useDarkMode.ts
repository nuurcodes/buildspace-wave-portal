// Based off https://usehooks-typescript.com/react-hook/use-dark-mode
import { useLocalStorage } from 'usehooks-ts'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

interface UseDarkModeOutput {
  isDarkMode: boolean
  toggle: () => void
  enable: () => void
  disable: () => void
}

export function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
  const getPrefersScheme = (): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(COLOR_SCHEME_QUERY).matches
    }

    return !!defaultValue
  }

  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    'darkMode',
    getPrefersScheme()
  )

  return {
    isDarkMode,
    toggle: () => setDarkMode((prev) => !prev),
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
  }
}
