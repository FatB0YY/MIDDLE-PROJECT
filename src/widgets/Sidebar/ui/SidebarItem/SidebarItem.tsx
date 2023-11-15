import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SidebarItem.module.scss'
import { ISidebarItem } from '../../model/items'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink'

interface SidebarItemProps {
  item: ISidebarItem
  collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation()

  const mods = {
    [cls.collapsed]: collapsed,
  }

  return (
    <AppLink theme={AppLinkTheme.SECONDARY} to={item.path} className={classNames(cls.item, mods, [])}>
      <item.Icon className={cls.icon} />
      {!collapsed && <span className={cls.link}>{t(item.text)}</span>}
    </AppLink>
  )
})