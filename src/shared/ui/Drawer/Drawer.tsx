import React, { ReactNode } from 'react'

import { Mods, classNames } from 'shared/lib/classNames/classNames'
import { useTheme } from 'app/providers/ThemeProvider'
// eslint-disable-next-line fatboyy-plugin1/path-checker
import { Portal } from 'shared/ui/Portal'
// eslint-disable-next-line fatboyy-plugin1/path-checker
import { Overlay } from 'shared/ui/Overlay/Overlay'

import cls from './Drawer.module.scss'

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
}

export const Drawer = ({
  className,
  children,
  isOpen,
  onClose
}: DrawerProps) => {
  const { theme } = useTheme()

  const mods: Mods = {
    [cls.opened]: isOpen
  }

  return (
    <Portal>
      <div
        className={classNames(cls.Drawer, mods, [
          className,
          theme,
          'app_drawer'
        ])}
      >
        <Overlay onClick={onClose} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  )
}
