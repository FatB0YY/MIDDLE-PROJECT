import React, { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CommentItem.module.scss'
import { IComment } from '../model/types/comment'
import { Avatar } from 'shared/ui/Avatar'
import { Text } from 'shared/ui/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'

interface CommentItemProps {
  className?: string
  comment: IComment
  isLoading?: boolean
}

export const CommentItem: FC<CommentItemProps> = ({ className, comment, isLoading }) => {
  if (isLoading) {
    return (
      <div className={classNames(cls.CommentItem, {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border='50%' />
          <Skeleton height={16} width={100} className={cls.username} />
        </div>
        <Skeleton width={'100%'} height={50} className={cls.text} />
      </div>
    )
  }

  return (
    <div className={classNames(cls.CommentItem, {}, [className])}>
      <div className={cls.header}>
        {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} alt={comment.user.username} /> : null}
        <Text className={cls.username} title={comment.user.username} />
      </div>
      <Text className={cls.text} text={comment.text} />
    </div>
  )
}
