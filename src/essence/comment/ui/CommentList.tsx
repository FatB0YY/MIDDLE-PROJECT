import React from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from 'shared/lib/classNames/classNames'

import { Text } from 'shared/ui/Text'

import { IComment } from '../model/types/comment'

import cls from './CommentList.module.scss'
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
      <div className={classNames(cls.CommentList, {}, [className])}>
        <Text title='Коментарии' />

        <CommentItem isLoading={true} />
        <CommentItem isLoading={true} />
        <CommentItem isLoading={true} />
      </div>
    )
  }

  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            isLoading={isLoading}
            className={cls.commentItem}
            comment={comment}
          />
        ))
      ) : (
        <Text title={t('entities.comment.commentnotfound')} />
      )}
    </div>
  )
}
