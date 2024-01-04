import React, { ReactNode } from 'react'

import { classNames } from '../../lib/classNames/classNames'

import { Tab } from './Tab'
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

export const Tabs = ({ className, onTabClick, tabs, value }: TabsProps) => {
  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Tab
          tab={tab}
          key={tab.value}
          value={value}
          className={cls.tab}
          onClick={() => onTabClick(tab)}
        >
          {tab.content}
        </Tab>
      ))}
    </div>
  )
}

Tabs.displayName = 'Tabs'
