import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Dropdown } from '@/shared/ui/Popups'

import { HStack } from '@/shared/ui/Stack'

import { ThemeButton } from '@/shared/ui/Button'

import { Icon } from '@/shared/ui/Icon'

import { Avatar } from '@/shared/ui/Avatar'

import { classNames } from '@/shared/lib/classNames/classNames'
import { useActionCreatorsTyped } from '@/shared/lib/store'
import LogoutSvg from '@/shared/assets/icons/logout.svg'
import ProfileSvg from '@/shared/assets/icons/profile-20-20.svg'
import AdminPanel from '@/shared/assets/icons/adminpanel.svg'
import { IUser, isUserAdmin, isUserManager, userActions } from '@/essence/user'

import { getRouteAdminpanel, getRouteProfile } from '@/shared/const/router'

import cls from './AvatarDropdown.module.scss'

interface AvatarDropdownProps {
  className?: string
  authData: IUser
}

export const AvatarDropdown = ({
  className,
  authData
}: AvatarDropdownProps) => {
  const { t } = useTranslation()

  const actionsUser = useActionCreatorsTyped(userActions)

  const isAdmin = useSelector(isUserAdmin)
  const isManager = useSelector(isUserManager)

  const isAdminPanelAvailable = isAdmin || isManager

  const onLogout = useCallback(() => {
    actionsUser.logout()
    /* eslint-disable */
  }, [actionsUser.logout])
  /* eslint-enable */

  return (
    <Dropdown
      className={classNames(cls.AvatarDropdown, {}, [className])}
      visibleIcon={false}
      direction='bottom left'
      items={[
        {
          content: (
            <HStack
              max
              gap='8'
            >
              <Icon Svg={LogoutSvg} />
              <span className={cls.dropdowntext}>
                {t('widgets.navbar.logout')}
              </span>
            </HStack>
          ),
          onClick: onLogout,
          buttonTheme: ThemeButton.CLEAR
        },
        {
          href: getRouteProfile(authData.id),
          content: (
            <HStack
              max
              gap='8'
            >
              <Icon Svg={ProfileSvg} />
              <span className={cls.dropdowntext}>
                {t('widgets.navbar.applink.profile')}
              </span>
            </HStack>
          ),
          onClick: () => {},
          buttonTheme: ThemeButton.CLEAR
        },
        ...(isAdminPanelAvailable
          ? [
              {
                href: getRouteAdminpanel(),
                content: (
                  <HStack
                    max
                    gap='8'
                  >
                    <Icon Svg={AdminPanel} />
                    <span className={cls.dropdowntext}>
                      {t('widgets.navbar.applink.adminpanel')}
                    </span>
                  </HStack>
                ),
                onClick: () => {},
                buttonTheme: ThemeButton.CLEAR
              }
            ]
          : [])
      ]}
      trigger={
        <Avatar
          size={30}
          src={authData.avatar}
          alt={authData.username}
        />
      }
    />
  )
}
