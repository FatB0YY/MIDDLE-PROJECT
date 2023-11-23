import React, { FC, memo, useCallback, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import { ArticleDetails } from 'essence/article'
import { useNavigate, useParams } from 'react-router-dom'
import { PageError } from 'widgets/PageError'
import { CommentList } from 'essence/comment'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from 'features/ArticleCommentsList/model/slice/articleDetailsCommentsSlice'
import { useSelector } from 'react-redux'
import {
  getArticleCommentsListErrors,
  getArticleCommentsListIsLoading,
} from 'features/ArticleCommentsList/model/selectors/ArticleCommentsListSelectors'
import { useActionCreatorsTyped } from 'shared/lib/store'
import { fetchCommentsByArticleIdThunk } from 'features/ArticleCommentsList/model/services/fetchCommentsByArticleIdThunk'
import { AddNewCommentAsync } from 'features/addNewComment'
import { addCommentForArticle } from 'features/ArticleCommentsList/model/services/addCommentForArticle'
import { Button } from 'shared/ui/Button'
import { useTranslation } from 'react-i18next'
import { RoutePath } from 'app/providers/router/config/routeConfig'
import { Page } from 'shared/ui/Page/Page'

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
  const { t } = useTranslation('article')
  const comments = useSelector(getArticleComments.selectAll)
  const isLoading = useSelector(getArticleCommentsListIsLoading)
  const errors = useSelector(getArticleCommentsListErrors)
  const actions = useActionCreatorsTyped(allActions)
  const navigate = useNavigate()

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

  const onBackToTheList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [navigate])

  useEffect(() => {
    if (__PROJECT__ !== 'sb') {
      actions.fetchComments(id)
    }
  }, [actions.fetchComments])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <Button onClick={onBackToTheList}>{t('pages.articledetailspage.backtothelist')}</Button>
        <ArticleDetails id={id} />
        <AddNewCommentAsync onSendComment={onSendComment} />
        <CommentList isLoading={isLoading} comments={comments} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
