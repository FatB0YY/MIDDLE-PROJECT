import React, { FC, useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { Modal } from 'shared/ui/Modal'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/index'

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev)
  }, [])

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button onClick={onToggleModal} theme={ThemeButton.CLEAR_INVERTED} className={cls.links}>
        {t('widgets.navbar.login')}
      </Button>
      <Button onClick={onToggleModal} theme={ThemeButton.CLEAR_INVERTED} className={cls.links}>
        {t('widgets.navbar.signup')}
      </Button>
      <Modal onClose={onToggleModal} isOpen={isAuthModal} children={<div>Modal</div>} />
    </div>
  )
}
