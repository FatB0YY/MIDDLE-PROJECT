import React from 'react'

import { Card } from '@/shared/ui/Card'
import { Text } from '@/shared/ui/Text'

import { classNames } from '@/shared/lib/classNames/classNames'

import { INotification } from '../../model/types/notification'

import cls from './NotificationItem.module.scss'

interface NotificationItemProps {
  className?: string
  item: INotification
}

export const NotificationItem = ({
  className,
  item
}: NotificationItemProps) => {
  const content = (
    <Card
      theme='outlined'
      className={classNames(cls.NotificationItem, {}, [className])}
    >
      <Text
        size='s'
        title={item.title}
        text={item.description}
      />
    </Card>
  )

  if (item.href) {
    return (
      <a
        className={cls.link}
        target='_blank'
        href={item.href}
        rel='noreferrer'
      >
        {content}
      </a>
    )
  }

  return content
}
