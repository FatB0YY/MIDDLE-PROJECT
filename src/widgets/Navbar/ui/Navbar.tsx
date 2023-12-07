import React, { memo, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'

import { classNames } from 'shared/lib/classNames/classNames'

import { Button, ThemeButton } from 'shared/ui/Button/index'
import { LoginModal } from 'features/AuthByUsername'
import { useActionCreatorsTyped } from 'shared/lib/store'
import { getUserAuthData, userActions } from 'essence/user'

import { Text, TextTheme } from 'shared/ui/Text'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink'
import { RoutePath } from 'app/providers/router/config/routeConfig'

import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)
  const { authData } = useSelector(getUserAuthData)

  const actionsUser = useActionCreatorsTyped(userActions)

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  const onLogout = useCallback(() => {
    actionsUser.logout()
    /* eslint-disable */
  }, [actionsUser.logout])
  /* eslint-enable */

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text
          theme={TextTheme.PRIMARY}
          className={cls.appName}
          title={t('widgets.navbar.appname')}
        />
        <AppLink
          className={cls.createBtn}
          theme={AppLinkTheme.PRIMARY}
          to={RoutePath.article_create}
        >
          {t('widgets.navbar.create')}
        </AppLink>
        <Button
          onClick={onLogout}
          theme={ThemeButton.CLEAR_INVERTED}
          className={cls.links}
        >
          {t('widgets.navbar.logout')}
        </Button>
      </header>
    )
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button
        onClick={onShowModal}
        theme={ThemeButton.CLEAR_INVERTED}
        className={cls.links}
      >
        {t('widgets.navbar.login')}
      </Button>
      {isAuthModal && (
        <LoginModal
          isOpen={isAuthModal}
          onClose={onCloseModal}
        />
      )}
    </header>
  )
})

Navbar.displayName = 'Navbar'
