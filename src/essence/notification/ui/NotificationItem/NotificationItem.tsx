import React from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Card, CardTheme } from '@/shared/ui/Card/Card'
import { Text, TextSize } from '@/shared/ui/Text'

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
      theme={CardTheme.OUTLINED}
      className={classNames(cls.NotificationItem, {}, [className])}
    >
      <Text
        size={TextSize.S}
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
