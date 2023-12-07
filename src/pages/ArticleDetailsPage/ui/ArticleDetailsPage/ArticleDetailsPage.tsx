import React, { memo, useCallback, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { classNames } from 'shared/lib/classNames/classNames'

import { ArticleDetails } from 'essence/article'
import { PageError } from 'widgets/PageError'
import { CommentList } from 'essence/comment'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import {
  articleDetailsCommentsReducer,
  getArticleComments,
  // getArticleCommentsListErrors,
  getArticleCommentsListIsLoading,
  fetchCommentsByArticleIdThunk,
  addCommentForArticle
} from 'features/ArticleCommentsList'

import { useActionCreatorsTyped } from 'shared/lib/store'

import { AddNewCommentAsync } from 'features/addNewComment'

import { Page } from 'widgets/Page/Page'
import { ArticleDetailsRecommendationsList } from 'features/ArticleDetailsRecommendationsList'

import cls from './ArticleDetailsPage.module.scss'
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader/ArticleDetailsPageHeader'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer
}

const allActions = {
  sendComment: addCommentForArticle,
  fetchComments: fetchCommentsByArticleIdThunk
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getArticleComments.selectAll)
  const isLoading = useSelector(getArticleCommentsListIsLoading)
  // const errors = useSelector(getArticleCommentsListErrors)
  const actions = useActionCreatorsTyped(allActions)

  useEffect(() => {
    if (id && __PROJECT__ !== 'sb') {
      actions.fetchComments(id)
    }
  }, [actions.fetchComments, id]) // eslint-disable-line

  const onSendComment = useCallback(
    (text: string) => {
      actions.sendComment(text)
    },
    [actions.sendComment] // eslint-disable-line
  )

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <PageError />
      </Page>
    )
  }

  return (
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount={true}
    >
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetailsPageHeader />

        <ArticleDetails id={id} />

        <ArticleDetailsRecommendationsList />

        <AddNewCommentAsync onSendComment={onSendComment} />
        <CommentList
          isLoading={isLoading}
          comments={comments}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
