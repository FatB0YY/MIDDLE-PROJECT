import React, { FC, memo, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { ArticleDetails } from 'essence/article'
import { useParams } from 'react-router-dom'
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

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
}

const allActions = {
  fetchComments: fetchCommentsByArticleIdThunk,
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation('article')
  const { id } = useParams<{ id: string }>()
  const comments = useSelector(getArticleComments.selectAll)
  const isLoading = useSelector(getArticleCommentsListIsLoading)
  const errors = useSelector(getArticleCommentsListErrors)
  const actions = useActionCreatorsTyped(allActions)

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <PageError />
      </div>
    )
  }

  useEffect(() => {
    if (__PROJECT__ !== 'sb') {
      console.log('1')

      actions.fetchComments(id).then((r) => console.log(r))
    }
  }, [actions.fetchComments])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <CommentList isLoading={isLoading} comments={comments} />
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
