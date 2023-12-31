import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { AddNewCommentAsync } from '@/features/addNewComment'
import { CommentList } from '@/essence/comment'
import {
  addCommentForArticle,
  fetchCommentsByArticleIdThunk,
  getArticleComments,
  getArticleCommentsListIsLoading
} from '@/features/ArticleCommentsList'
import { useActionCreatorsTyped } from '@/shared/lib/store'

import cls from './ArticleDetailsComments.module.scss'

interface ArticleDetailsCommentsProps {
  className?: string
  id: string
}

const allActions = {
  sendComment: addCommentForArticle,
  fetchComments: fetchCommentsByArticleIdThunk
}

export const ArticleDetailsComments = ({
  className,
  id
}: ArticleDetailsCommentsProps) => {
  const comments = useSelector(getArticleComments.selectAll)
  const isLoading = useSelector(getArticleCommentsListIsLoading)
  // const errors = useSelector(getArticleCommentsListErrors)

  const actions = useActionCreatorsTyped(allActions)

  const onSendComment = useCallback(
    (text: string) => {
      actions.sendComment(text)
    },
    [actions.sendComment] // eslint-disable-line
  )

  useEffect(() => {
    if (id && __PROJECT__ !== 'sb') {
      actions.fetchComments(id)
    }
  }, [actions.fetchComments, id]) // eslint-disable-line

  return (
    <div className={classNames(cls.ArticleDetailsComments, {}, [className])}>
      <AddNewCommentAsync onSendComment={onSendComment} />
      <CommentList
        isLoading={isLoading}
        comments={comments}
      />
    </div>
  )
}
