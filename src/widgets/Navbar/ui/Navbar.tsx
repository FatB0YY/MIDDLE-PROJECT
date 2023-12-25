import React, { memo, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'

import { classNames } from 'shared/lib/classNames/classNames'

import { Button, ThemeButton } from 'shared/ui/Button/index'
import { LoginModal } from 'features/AuthByUsername'
import { useActionCreatorsTyped } from 'shared/lib/store'
import { getUserAuthData } from 'essence/user'
import { Avatar } from 'shared/ui/Avatar'
import { HStack } from 'shared/ui/Stack'
import { ButtonSize } from 'shared/ui/Button/ui/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import AppLogo from 'shared/assets/logo.jpg'
import BurgerIcon from 'shared/assets/icons/burger.svg'
import { SidebarActions } from 'widgets/Sidebar'
import { AvatarDropdown } from 'features/AvatarDropdown'
import { NotificationButton } from 'features/NotificationButton'

import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)
  const { authData } = useSelector(getUserAuthData)
  const sidebarActions = useActionCreatorsTyped(SidebarActions)

  const onToggleSidebar = () => {
    sidebarActions.setCollapsed()
  }

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <HStack
        justify='between'
        align='center'
        max
      >
        <HStack gap='16'>
          <Button
            data-testid='sidebar-toggle'
            size={ButtonSize.M}
            onClick={onToggleSidebar}
            theme={ThemeButton.ICON_OUTLINE}
          >
            {<Icon Svg={BurgerIcon} />}
          </Button>
          <Avatar
            src={AppLogo}
            alt={t('widgets.navbar.appname')}
            size={42}
          />
        </HStack>

        {/* // перенести в профиль -------------------------------- */}
        {/* <AppLink
            theme={AppLinkTheme.PRIMARY}
            to={RoutePath.article_create}
          >
            {t('widgets.navbar.create')}
          </AppLink> */}
        {/* // ---------------------------------------------------- */}

        <HStack
          gap='16'
          className={cls.actions}
        >
          {authData && (
            <>
              <NotificationButton />
              <AvatarDropdown authData={authData} />
            </>
          )}
        </HStack>

        {!authData && (
          <Button
            onClick={onShowModal}
            theme={ThemeButton.OUTLINE}
            className={cls.links}
          >
            {t('widgets.navbar.login')}
          </Button>
        )}

        {isAuthModal && (
          <LoginModal
            isOpen={isAuthModal}
            onClose={onCloseModal}
          />
        )}
      </HStack>
    </header>
  )
})

Navbar.displayName = 'Navbar'
