import React, { memo, useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

import { classNames } from 'shared/lib/classNames/classNames'

import { ThemeSwitcher } from 'widgets/ThemeSwitcher/index'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { Button, ThemeButton } from 'shared/ui/Button'
import { ButtonSize } from 'shared/ui/Button/ui/Button'
import { VStack } from 'shared/ui/Stack/VStack/VStack'

import { SidebarItem } from '../SidebarItem/SidebarItem'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'

import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

// если true навешиваем  класс collapsed, если false - удаляем
// { [cls.collapsed]: collapsed }

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const sidebarItemsList = useSelector(getSidebarItems)

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  // в каких случаях перерисовывается компонент:
  // 1. изменился пропс
  // 2. изменилось состояние (state)
  // 3. перерисовался родитель -> предотвращение мемоизацией
  // ------- или
  // memo hoc для SidebarItem

  // const itemsList = useMemo(
  //   () => SidebarItemsList.map((item) => <SidebarItem key={item.path} item={item} collapsed={collapsed} />),
  //   [collapsed]
  // )

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <li key={item.path}>
          <SidebarItem
            item={item}
            collapsed={collapsed}
          />
        </li>
      )),
    [collapsed, sidebarItemsList]
  )

  return (
    <menu
      data-testid='sidebar'
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className
      ])}
    >
      <Button
        data-testid='sidebar-toggle'
        size={ButtonSize.XL}
        square
        theme={ThemeButton.BACKGROUND_INVERTED}
        onClick={onToggle}
        className={cls.collapseBtn}
      >
        {collapsed ? '>' : '<'}
      </Button>

      <nav>
        <ul>
          <VStack
            gap='8'
            className={cls.items}
          >
            {itemsList}
          </VStack>
        </ul>
      </nav>

      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher
          short={collapsed}
          className={cls.lang}
        />
      </div>
    </menu>
  )
})

Sidebar.displayName = 'Sidebar'
