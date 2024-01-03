import React, { memo, useMemo } from 'react'

import { useSelector } from 'react-redux'

import { VStack } from '@/shared/ui/Stack'

import { classNames } from '@/shared/lib/classNames/classNames'

import { SidebarItem } from '../SidebarItem/SidebarItem'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import { getCollapsed } from '../../model/selectors/sidebarSelectors'

import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

// если true навешиваем  класс collapsed, если false - удаляем
// { [cls.collapsed]: collapsed }

export const Sidebar = memo(({ className }: SidebarProps) => {
  const sidebarItemsList = useSelector(getSidebarItems)
  const collapsed = useSelector(getCollapsed)

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
        <SidebarItem
          item={item}
          key={item.path}
          collapsed={collapsed}
        />
      )),
    [collapsed, sidebarItemsList]
  )

  return (
    <aside
      data-testid='sidebar'
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className
      ])}
    >
      <VStack
        role='navigation'
        gap='8'
        className={cls.items}
      >
        {itemsList}
      </VStack>
    </aside>
  )
})

Sidebar.displayName = 'Sidebar'
