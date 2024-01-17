import React, { memo, useCallback } from 'react'

import { Button } from '@/shared/ui/Button'
import { useAppDispatch } from '@/shared/lib/store'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
// import { Theme } from '@/shared/const/theme'
import { saveJsonSettings } from '@/essence/user'
import { Icon } from '@/shared/ui/Icon'

import ThemeIcon from '@/shared/assets/icons/themenew.svg'

import cls from './ThemeSwitcher.module.scss'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { toggleTheme } = useTheme()
  const dispatch = useAppDispatch()

  const onToggleHandler = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }))
    })
  }, [dispatch, toggleTheme])

  return (
    <Button
      theme='clear'
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={onToggleHandler}
    >
      <Icon
        width={35}
        height={35}
        color={'var(--inactive-icon-text-color)'}
        Svg={ThemeIcon}
      />
    </Button>
  )
})

ThemeSwitcher.displayName = 'ThemeSwitcher'
