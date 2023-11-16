import React, { FC, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ThemeSwitcher.module.scss'
import { useTheme, Theme } from 'app/providers/ThemeProvider'
import LightIcon from '../assets/icons/theme-light.svg'
import DarkIcon from '../assets/icons/theme-dark.svg'

import { Button, ThemeButton } from 'shared/ui/Button'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(({ className }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button theme={ThemeButton.CLEAR} className={classNames(cls.ThemeSwitcher, {}, [className])} onClick={toggleTheme}>
      {theme === Theme.DARK ? (
        <DarkIcon width={35} height={35} color={'var(--main-color)'} />
      ) : (
        <LightIcon width={35} height={35} color={'var(--main-color)'} />
      )}
    </Button>
  )
})
