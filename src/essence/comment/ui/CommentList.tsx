import React, { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CommentList.module.scss'
import { IComment } from '../model/types/comment'
import { Text } from 'shared/ui/Text'
import { useTranslation } from 'react-i18next'
import { CommentItem } from './CommentItem'

interface CommentListProps {
  className?: string
  comments?: IComment[]
  isLoading?: boolean
}

export const CommentList: FC<CommentListProps> = ({ className, isLoading, comments }) => {
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
          <CommentItem key={comment.id} isLoading={isLoading} className={cls.commentItem} comment={comment} />
        ))
      ) : (
        <Text title={t('entities.comment.commentnotfound')} />
      )}
    </div>
  )
}
