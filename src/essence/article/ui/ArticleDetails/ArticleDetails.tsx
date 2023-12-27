// Updated ArticleDetails.jsx
import React, { memo, useEffect } from 'react'

import { useSelector } from 'react-redux'

import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useActionCreatorsTyped } from 'shared/lib/store'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { classNames } from 'shared/lib/classNames/classNames'
import { VStack } from 'shared/ui/Stack'
import { PageError } from 'widgets/PageError'

import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { fetchArticleByIdThunk } from '../../model/services/fetchArticleByIdThunk'

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsisLoading
} from '../../model/selectors/articleDetailsSelectors'

import cls from './ArticleDetails.module.scss'
import ArticleHeaderComponent from './ArticleHeaderComponent'
import ArticleListComponent from './ArticleListComponent'

interface ArticleDetailsProps {
  className?: string
  id: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer
}

const actions = {
  fetchArticle: fetchArticleByIdThunk
}

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
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
      <VStack
        max
        gap='32'
      >
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border='50%'
        />
        <Skeleton
          className={cls.title}
          width={300}
          height={32}
        />
        <Skeleton
          className={cls.skeleton}
          width={600}
          height={24}
        />
        <Skeleton
          className={cls.skeleton}
          width='100%'
          height={200}
        />
        <Skeleton
          className={cls.skeleton}
          width='100%'
          height={200}
        />
      </VStack>
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
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount={true}
    >
      <VStack
        gap='16'
        max
        className={classNames(cls.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  )
})

ArticleDetails.displayName = 'ArticleDetails'
