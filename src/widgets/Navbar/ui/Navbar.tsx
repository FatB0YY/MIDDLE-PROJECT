import React, { FC, useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { Modal } from 'shared/ui/Modal'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/index'
import { LoginModal } from 'features/AuthByUsername'

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button onClick={onShowModal} theme={ThemeButton.CLEAR_INVERTED} className={cls.links}>
        {t('widgets.navbar.login')}
      </Button>
      <Button onClick={onShowModal} theme={ThemeButton.CLEAR_INVERTED} className={cls.links}>
        {t('widgets.navbar.signup')}
      </Button>
      <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
    </div>
  )
}
