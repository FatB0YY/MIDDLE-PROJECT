import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { classNames } from 'shared/lib/classNames/classNames'

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink'
import { getUserAuthData } from 'essence/user'

import { ISidebarItem } from '../../model/types/sidebar'

import cls from './SidebarItem.module.scss'

interface SidebarItemProps {
  item: ISidebarItem
  collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation()
  const { authData } = useSelector(getUserAuthData)

  if (item.authOnly && !authData) {
    return null
  }

  const mods = {
    [cls.collapsed]: collapsed
  }

  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={classNames(cls.item, mods, [])}
    >
      <item.Icon className={cls.icon} />
      {!collapsed && <span className={cls.link}>{t(item.text)}</span>}
    </AppLink>
  )
})

SidebarItem.displayName = 'SidebarItem'
