import React, { memo, useCallback } from 'react'

import { Button, ThemeButton } from '@/shared/ui/Button'
import { useAppDispatch } from '@/shared/lib/store'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { Theme } from '@/shared/const/theme'
import { saveJsonSettings } from '@/essence/user'

import LightIcon from '../assets/icons/theme-light.svg'
import DarkIcon from '../assets/icons/theme-dark.svg'

import cls from './ThemeSwitcher.module.scss'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme()
  const dispatch = useAppDispatch()

  const onToggleHandler = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }))
    })
  }, [dispatch, toggleTheme])

  return (
    <Button
      theme={ThemeButton.CLEAR}
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={onToggleHandler}
    >
      {theme === Theme.DARK ? (
        <DarkIcon
          width={35}
          height={35}
          color={'var(--inactive-icon-text-color'}
        />
      ) : (
        <LightIcon
          width={35}
          height={35}
          color={'var(--inactive-icon-text-color)'}
        />
      )}
    </Button>
  )
})

ThemeSwitcher.displayName = 'ThemeSwitcher'
