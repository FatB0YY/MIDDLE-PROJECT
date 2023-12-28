import React from 'react'
import { Link } from 'react-router-dom'

import { classNames } from '@/shared/lib/classNames/classNames'

import { Avatar } from '@/shared/ui/Avatar'
import { Text } from '@/shared/ui/Text'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
// import { AppLink } from 'shared/ui/AppLink'
import { RoutePath } from '@/app/providers/router/config/routeConfig'
import { PageError } from '@/widgets/PageError'
import { VStack } from '@/shared/ui/Stack'

import { IComment } from '../../../model/types/comment'

import cls from './CommentItem.module.scss'

interface CommentItemProps {
  className?: string
  comment?: IComment
  isLoading?: boolean
}

export const CommentItem = ({
  className,
  comment,
  isLoading
}: CommentItemProps) => {
  if (isLoading) {
    return (
      <VStack
        max
        className={classNames(cls.CommentItem, {}, [className])}
      >
        <div className={cls.header}>
          <Skeleton
            width={30}
            height={30}
            border='50%'
          />
          <Skeleton
            height={16}
            width={100}
            className={cls.username}
          />
        </div>
        <Skeleton
          width={'100%'}
          height={50}
          className={cls.text}
        />
      </VStack>
    )
  }

  if (!comment) {
    return <PageError />
  }

  return (
    <VStack
      max
      gap='8'
      className={classNames(cls.CommentItem, {}, [className])}
    >
      <Link
        to={`${RoutePath.profile}${comment.user.id}`}
        className={cls.header}
      >
        {comment.user.avatar ? (
          <Avatar
            size={30}
            src={comment.user.avatar}
            alt={comment.user.username}
          />
        ) : null}
        <Text
          className={cls.username}
          title={comment.user.username}
        />
      </Link>
      <Text
        className={cls.text}
        text={comment.text}
      />
    </VStack>
  )
}
