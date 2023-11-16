import React, { FC, memo, useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/index'
import { LoginModal } from 'features/AuthByUsername'
import { useActionCreatorsTyped } from 'shared/lib/store'
import { getUserAuthData, userActions } from 'essence/user'
import { useSelector } from 'react-redux'

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
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
  }, [actionsUser.logout])

  if (authData) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
        <Button onClick={onLogout} theme={ThemeButton.CLEAR_INVERTED} className={cls.links}>
          {t('widgets.navbar.logout')}
        </Button>
      </div>
    )
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button onClick={onShowModal} theme={ThemeButton.CLEAR_INVERTED} className={cls.links}>
        {t('widgets.navbar.login')}
      </Button>
      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
    </div>
  )
})
