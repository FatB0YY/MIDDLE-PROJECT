import React, { memo, useCallback } from 'react'

import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { useActionCreatorsTyped } from 'shared/lib/store'
import { Page } from 'widgets/Page/Page'
import { classNames } from 'shared/lib/classNames/classNames'

import { ArticlesPageFilters } from '../ArticlePageFilters/ArticlePageFilters'
import { ArticlePageInfinityList } from '../ArticlePageInfinityList/ArticlePageInfinityList'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPageThunk'
import { articlesPageReducer } from '../../model/slice/articlesPageSlice'

import cls from './ArticlePage.module.scss'

interface ArticlePageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer
}

const allActions = {
  fetchNextArticles: fetchNextArticlesPage
}

const ArticlePage = ({ className }: ArticlePageProps) => {
  const actions = useActionCreatorsTyped(allActions)

  const onLoadNextPart = useCallback(() => {
    actions.fetchNextArticles()
  }, [actions.fetchNextArticles])

  return (
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount={false}
    >
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticlesPageFilters />
        <ArticlePageInfinityList />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlePage)
