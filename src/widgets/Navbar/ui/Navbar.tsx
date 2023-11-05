import React, { FC, useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { Modal } from 'shared/ui/Modal'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/index'
import { LoginModal } from 'features/AuthByUsername'
import { useActionCreators, useStateSelector } from 'shared/lib/store'
import { getUserAuthData, userActions } from 'entities/User'

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)
  const authData = useStateSelector(getUserAuthData)
  // dispatch
  const actionsUser = useActionCreators(userActions)

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  const onLogout = useCallback(() => {
    setIsAuthModal(false)
    actionsUser.logout()
  }, [])

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
      <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
    </div>
  )
}
