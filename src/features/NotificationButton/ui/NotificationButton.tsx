import React from 'react'

import { classNames } from 'shared/lib/classNames/classNames'
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'
import { NotificationList } from 'essence/notification'
import { Popover } from 'shared/ui/Popups'
import { Button, ThemeButton } from 'shared/ui/Button'
import { Icon } from 'shared/ui/Icon/Icon'

import cls from './NotificationButton.module.scss'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
  return (
    <Popover
      className={classNames(cls.NotificationButton, {}, [className])}
      trigger={
        <Button
          className={cls.notbtn}
          theme={ThemeButton.CLEAR}
        >
          <Icon Svg={NotificationIcon} />
        </Button>
      }
      direction='bottom left'
    >
      <NotificationList />
    </Popover>
  )
}
