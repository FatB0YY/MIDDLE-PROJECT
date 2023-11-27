import React, { FC, memo, useCallback, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import { ArticleDetails } from 'essence/article'
import { useParams } from 'react-router-dom'
import { PageError } from 'widgets/PageError'
import { CommentList } from 'essence/comment'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsCommentsReducer, getArticleComments } from 'features/ArticleCommentsList'
import { useSelector } from 'react-redux'
import { getArticleCommentsListErrors, getArticleCommentsListIsLoading } from 'features/ArticleCommentsList'
import { useActionCreatorsTyped } from 'shared/lib/store'
import { fetchCommentsByArticleIdThunk } from 'features/ArticleCommentsList'
import { AddNewCommentAsync } from 'features/addNewComment'
import { addCommentForArticle } from 'features/ArticleCommentsList'
import { useTranslation } from 'react-i18next'
import { Page } from 'widgets/Page/Page'
import { ArticleDetailsRecommendationsList } from 'features/ArticleDetailsRecommendationsList'
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader/ArticleDetailsPageHeader'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
}

const allActions = {
  sendComment: addCommentForArticle,
  fetchComments: fetchCommentsByArticleIdThunk,
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getArticleComments.selectAll)
  const isLoading = useSelector(getArticleCommentsListIsLoading)
  const errors = useSelector(getArticleCommentsListErrors)
  const actions = useActionCreatorsTyped(allActions)

  const onSendComment = useCallback(
    (text: string) => {
      actions.sendComment(text)
    },
    [actions.sendComment]
  )

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <PageError />
      </Page>
    )
  }

  useEffect(() => {
    if (__PROJECT__ !== 'sb') {
      actions.fetchComments(id)
    }
  }, [actions.fetchComments])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetailsPageHeader />

        <ArticleDetails id={id} />

        <ArticleDetailsRecommendationsList />

        <AddNewCommentAsync onSendComment={onSendComment} />
        <CommentList isLoading={isLoading} comments={comments} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
