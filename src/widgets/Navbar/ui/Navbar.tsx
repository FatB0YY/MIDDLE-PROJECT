import React from 'react'
import { useSelector } from 'react-redux'

import { HStack } from '@/shared/ui/Stack'
import { getUserAuthData } from '@/essence/user'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AvatarDropdown } from '@/features/AvatarDropdown'
import { NotificationButton } from '@/features/NotificationButton'

import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const { authData } = useSelector(getUserAuthData)

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
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
    </header>
  )
}
