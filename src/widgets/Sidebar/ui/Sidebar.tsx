import React, { FC, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher/index'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { Button, ThemeButton } from 'shared/ui/Button'
import { ButtonSize } from 'shared/ui/Button/ui/Button'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink'
import { useTranslation } from 'react-i18next'
import { RoutePath } from 'app/providers/router/config/routeConfig'
import MainIcon from '../assets/icons/main-20-20.svg'
import AboutIcon from '../assets/icons/about-20-20.svg'

interface SidebarProps {
  className?: string
}

// если true навешивамаем класс collapsed, если false - удаляем
// { [cls.collapsed]: collapsed }

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false)

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  const { t } = useTranslation()

  return (
    <div data-testid='sidebar' className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
      <div className={cls.items}>
        <div className={cls.item}>
          <AppLink to={RoutePath.main} className={cls.link}>
            {collapsed ? <MainIcon className={cls.icon} /> : <span> {t('widgets.navbar.applink.main')}</span>}
          </AppLink>
        </div>

        <div className={cls.item}>
          <AppLink to={RoutePath.about} className={cls.link}>
            {collapsed ? <AboutIcon className={cls.icon} /> : <span>{t('widgets.navbar.applink.about')}</span>}
          </AppLink>
        </div>
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
}
