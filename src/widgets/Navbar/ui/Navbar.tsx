import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { HStack } from '@/shared/ui/Stack'
import { getUserAuthData } from '@/essence/user'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AvatarDropdown } from '@/features/AvatarDropdown'
import { NotificationButton } from '@/features/NotificationButton'

import { LoginModal } from '@/features/AuthByUsername'
import { Button } from '@/shared/ui/Button'

import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const { authData } = useSelector(getUserAuthData)
  const [isAuthModal, setIsAuthModal] = useState(false)

  const { t } = useTranslation()

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <HStack
        gap='16'
        className={cls.actions}
      >
        {authData ? (
          <>
            <NotificationButton />
            <AvatarDropdown authData={authData} />
          </>
        ) : (
          <Button
            onClick={onShowModal}
            theme='outline'
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
}
