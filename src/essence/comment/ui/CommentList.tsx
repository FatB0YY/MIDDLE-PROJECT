import React from 'react'

import { useTranslation } from 'react-i18next'

import { VStack } from 'shared/ui/Stack'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text'

import { IComment } from '../model/types/comment'

import { CommentItem } from './CommentItem'

interface CommentListProps {
  className?: string
  comments?: IComment[]
  isLoading?: boolean
}

export const CommentList = ({
  className,
  isLoading,
  comments
}: CommentListProps) => {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <VStack
        max
        gap='16'
        className={classNames('', {}, [className])}
      >
        <Text title='Комментарии (перевод!!)' />

        <CommentItem isLoading />
        <CommentItem isLoading />
        <CommentItem isLoading />
      </VStack>
    )
  }

  return (
    <VStack
      gap='16'
      max
      className={classNames('', {}, [className])}
    >
      {comments?.length ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            isLoading={isLoading}
            comment={comment}
          />
        ))
      ) : (
        <Text title={t('entities.comment.commentnotfound')} />
      )}
    </VStack>
  )
}
