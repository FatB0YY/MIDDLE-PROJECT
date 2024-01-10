import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { Theme } from '@/shared/const/theme'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'
import { getUserJsonSettings } from '@/essence/user'

interface ThemeProviderProps {
  initialTheme?: Theme
  children: ReactNode
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { initialTheme, children } = props
  const [isThemeInitiated, setIsThemeInitiated] = useState(false)
  const { theme: defaultTheme } = useSelector(getUserJsonSettings)
  const [theme, setTheme] = useState<Theme>(
    initialTheme || defaultTheme || Theme.LIGHT
  )

  useEffect(() => {
    if (!isThemeInitiated && defaultTheme) {
      setTheme(defaultTheme)
      setIsThemeInitiated(true)
    }
  }, [defaultTheme, isThemeInitiated])
  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
