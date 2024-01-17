import React, { memo, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'

import { Icon } from '@/shared/ui/Icon'
import { HStack } from '@/shared/ui/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import AppLogo from '@/shared/assets/logo.jpg'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { LangSwitcher } from '@/features/LangSwitcher'

import { SidebarItem } from '../SidebarItem/SidebarItem'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'

import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

// если true навешиваем  класс collapsed, если false - удаляем
// { [cls.collapsed]: collapsed }

export const Sidebar = memo(({ className }: SidebarProps) => {
  const { t } = useTranslation()
  const sidebarItemsList = useSelector(getSidebarItems)
  const [collapsed, setCollapsed] = useState(false)

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

  const toggleSidebarCollapsed = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <aside
      data-testid='sidebar'
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className
      ])}
    >
      <HStack
        align='center'
        justify='center'
        max
      >
        <Avatar
          className={cls.applogo}
          src={AppLogo}
          alt={t('widgets.navbar.appname')}
          size={collapsed ? 40 : 64}
        />
      </HStack>

      <nav
        className={classNames(cls.items, { [cls.collapsed]: collapsed }, [])}
      >
        {itemsList}
      </nav>

      <Button
        className={classNames(
          cls.buttonCollapsed,
          { [cls.collapsed]: collapsed },
          []
        )}
        theme='icon_outline'
        onClick={toggleSidebarCollapsed}
      >
        <Icon
          width='30px'
          height='30px'
          Svg={ArrowIcon}
        />
      </Button>

      <div
        className={classNames(
          cls.switchersWrapper,
          { [cls.collapsed]: collapsed },
          []
        )}
      >
        <ThemeSwitcher />
        <LangSwitcher className={cls.lang} />
      </div>
    </aside>
  )
})

Sidebar.displayName = 'Sidebar'
