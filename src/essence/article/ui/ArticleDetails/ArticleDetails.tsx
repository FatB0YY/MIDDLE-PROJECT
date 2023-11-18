// Updated ArticleDetails.jsx
import React, { FC, memo, useEffect } from 'react'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { useActionCreatorsTyped } from 'shared/lib/store'
import { fetchArticleByIdThunk } from '../../model/services/fetchArticleByIdThunk'
import { useSelector } from 'react-redux'
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsisLoading,
} from '../../model/selectors/articleDetailsSelectors'
import { Text, TextAlign } from 'shared/ui/Text'
import { useTranslation } from 'react-i18next'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetails.module.scss'
import ArticleHeaderComponent from './ArticleHeaderComponent'
import ArticleListComponent from './ArticleListComponent'
import { PageError } from 'widgets/PageError'

interface ArticleDetailsProps {
  className?: string
  id: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

const actions = {
  fetchArticle: fetchArticleByIdThunk,
}

export const ArticleDetails: FC<ArticleDetailsProps> = memo(({ className, id }) => {
  const { t } = useTranslation('article')
  const actionsArticleDetails = useActionCreatorsTyped(actions)
  const isLoading = useSelector(getArticleDetailsisLoading)
  const article = useSelector(getArticleDetailsData)
  const error = useSelector(getArticleDetailsError)

  useEffect(() => {
    if (__PROJECT__ !== 'sb') {
      actionsArticleDetails.fetchArticle(id)
    }
  }, [actionsArticleDetails.fetchArticle, id])

  let content = null

  if (isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} width={200} height={200} border='50%' />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width='100%' height={200} />
        <Skeleton className={cls.skeleton} width='100%' height={200} />
      </>
    )
  } else if (error || !article) {
    content = <PageError />
  } else {
    content = (
      <>
        <ArticleHeaderComponent article={article} />
        <ArticleListComponent blocks={article.blocks} />
      </>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>{content}</div>
    </DynamicModuleLoader>
  )
})
