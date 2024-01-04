import React, { ReactNode, useCallback } from 'react'

import { classNames } from '../../lib/classNames/classNames'

import cls from './Tab.module.scss'
import { TabItem } from './Tabs'

interface TabProps {
  className?: string
  children?: ReactNode
  tab: TabItem
  value: string
  onClick: (tab: TabItem) => void
}

export const Tab = ({ className, children, tab, value, onClick }: TabProps) => {
  const clickHandle = useCallback(
    (tab: TabItem) => {
      return () => {
        onClick(tab)
      }
    },
    [onClick]
  )

  const theme = tab.value === value ? `${cls.ACTIVE}` : ''

  return (
    <button
      onClick={clickHandle(tab)}
      className={classNames(cls.Tab, {}, [className, theme])}
    >
      {children}
    </button>
  )
}
