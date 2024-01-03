import React, { ReactNode, memo, useCallback } from 'react'

import { classNames } from '../../lib/classNames/classNames'
import { Card, CardTheme } from '../Card/Card'

import cls from './Tabs.module.scss'

export interface TabItem {
  value: string
  content: ReactNode
}

interface TabsProps {
  className?: string
  tabs: TabItem[]
  value: string
  onTabClick: (tab: TabItem) => void
}

export const Tabs = memo(
  ({ className, onTabClick, tabs, value }: TabsProps) => {
    const clickHandle = useCallback(
      (tab: TabItem) => {
        return () => {
          onTabClick(tab)
        }
      },
      [onTabClick]
    )

    return (
      <div className={classNames(cls.Tabs, {}, [className])}>
        {tabs.map((tab) => (
          <Card
            onClick={clickHandle(tab)}
            theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
            key={tab.value}
            className={cls.tab}
          >
            {tab.content}
          </Card>
        ))}
      </div>
    )
  }
)

Tabs.displayName = 'Tabs'
