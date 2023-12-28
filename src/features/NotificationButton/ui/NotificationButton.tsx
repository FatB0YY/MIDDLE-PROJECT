import React, { useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'

import { Drawer } from '@/shared/ui/Drawer/Drawer'
import { classNames } from '@/shared/lib/classNames/classNames'
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg'
import { NotificationList } from '@/essence/notification'
import { Popover } from '@/shared/ui/Popups'
import { Button, ThemeButton } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon/Icon'
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider'

import cls from './NotificationButton.module.scss'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false)
  }, [])

  const trigger = (
    <Button
      className={cls.notbtn}
      onClick={onOpenDrawer}
      theme={ThemeButton.CLEAR}
    >
      <Icon
        Svg={NotificationIcon}
        // inverted
      />
    </Button>
  )

  return (
    <>
      <BrowserView>
        <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          direction='bottom left'
          trigger={trigger}
        >
          <NotificationList
            className={cls.NotificationList}
            classNameLoader={cls.NotificationListLoading}
          />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        {/* подгружаем асинк доп библиотеки в мобильные версии */}
        <AnimationProvider>
          <Drawer
            isOpen={isOpen}
            onClose={onCloseDrawer}
          >
            <NotificationList />
          </Drawer>
        </AnimationProvider>
      </MobileView>
    </>
  )
}
