import React, { FC, memo, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher/index'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { Button, ThemeButton } from 'shared/ui/Button'
import { ButtonSize } from 'shared/ui/Button/ui/Button'
import { SidebarItemsList } from '../../model/items'
import { SidebarItem } from '../SidebarItem/SidebarItem'

interface SidebarProps {
  className?: string
}

// если true навешивамаем класс collapsed, если false - удаляем
// { [cls.collapsed]: collapsed }

export const Sidebar: FC<SidebarProps> = memo(({ className }) => {
  const [collapsed, setCollapsed] = useState(false)

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

  return (
    <div data-testid='sidebar' className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
      <div className={cls.items}>
        {SidebarItemsList.map((item) => (
          <SidebarItem key={item.path} item={item} collapsed={collapsed} />
        ))}
      </div>

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
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </div>
  )
})
