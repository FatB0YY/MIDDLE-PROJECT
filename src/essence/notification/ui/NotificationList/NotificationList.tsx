import React from 'react'

import { classNames } from 'shared/lib/classNames/classNames'
import { useGetNotificationListQuery } from 'essence/notification/api/notificationApi'
import { VStack } from 'shared/ui/Stack'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'

import { NotificationItem } from '../NotificationItem/NotificationItem'

import cls from './NotificationList.module.scss'

interface NotificationListProps {
  className?: string
}

export const NotificationList = ({ className }: NotificationListProps) => {
  const { isLoading: isNotificationLoading, data: notifications } =
    useGetNotificationListQuery(null, { pollingInterval: 1000 })

  if (isNotificationLoading) {
    return (
      <VStack
        gap='16'
        className={classNames(cls.NotificationListLoading, {}, [className])}
      >
        <Skeleton
          width='100%'
          height='40px'
          border='5px'
        />
        <Skeleton
          width='60%'
          height='40px'
          border='5px'
        />
        <Skeleton
          width='70%'
          height='40px'
          border='5px'
        />
      </VStack>
    )
  }

  return (
    <VStack
      gap='16'
      className={classNames(cls.NotificationList, {}, [className])}
    >
      {notifications?.map((item) => (
        <NotificationItem
          key={item.id}
          item={item}
        />
      ))}
    </VStack>
  )
}
