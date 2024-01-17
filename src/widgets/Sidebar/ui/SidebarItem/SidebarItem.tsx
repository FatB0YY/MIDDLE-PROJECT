import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'

import { Icon } from '@/shared/ui/Icon'

import { classNames } from '@/shared/lib/classNames/classNames'
import { getUserAuthData } from '@/essence/user'
// import { HStack } from 'shared/ui/Stack'

import { ISidebarItem } from '../../model/types/sidebar'

import cls from './SidebarItem.module.scss'

interface SidebarItemProps {
  item: ISidebarItem
  collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation()
  const { authData } = useSelector(getUserAuthData)
  const location = useLocation()

  if (item.authOnly && !authData) {
    return null
  }

  const classNameLi = `${cls.li} ${
    location.pathname === item.path ? cls.active : ''
  }`

  const mods = {
    [cls.collapsed]: collapsed
  }

  return (
    <li className={classNames(classNameLi, mods, [])}>
      <NavLink
        to={item.path}
        className={classNames(cls.link, mods, [])}
      >
        <Icon
          width={'18px'}
          height={'18px'}
          Svg={item.Icon}
        />
        {!collapsed && <span className={cls.text}>{t(item.text)}</span>}
      </NavLink>
    </li>
  )
})

SidebarItem.displayName = 'SidebarItem'
