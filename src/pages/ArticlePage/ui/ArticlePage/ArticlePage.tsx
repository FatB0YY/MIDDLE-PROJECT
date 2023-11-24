import React, { FC, memo, useCallback, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlePage.module.scss'
import { useTranslation } from 'react-i18next'
import { ArticleList, EArticleView } from 'essence/article'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { articlesPageActions, articlesPageReducer, getArticles } from 'pages/ArticlePage/model/slice/articlesPageSlice'
import { useActionCreatorsTyped } from 'shared/lib/store'
import { useSelector } from 'react-redux'

import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors'
import { ArticleViewSelector } from 'features/ArticleViewSelector'
import { Page } from 'widgets/Page/ui/Page'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPageThunk'
import { initArticlesPage } from '../../model/services/initArticlesPage'

interface ArticlePageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const allActions = {
  ...articlesPageActions,
  fetchNextArticles: fetchNextArticlesPage,
  initArticlesPage: initArticlesPage,
}

const ArticlePage: FC<ArticlePageProps> = ({ className }) => {
  const { t } = useTranslation('article')

  const actionsArticlesPage = useActionCreatorsTyped(allActions)

  const articles = useSelector(getArticles.selectAll)

  const isLoading = useSelector(getArticlesPageIsLoading)
  const error = useSelector(getArticlesPageError)
  const view = useSelector(getArticlesPageView)

  const onChangeView = useCallback(
    (view: EArticleView) => {
      actionsArticlesPage.setView(view)
    },
    [actionsArticlesPage.setView]
  )

  const onLoadNextPart = useCallback(() => {
    actionsArticlesPage.fetchNextArticles()
  }, [actionsArticlesPage.fetchNextArticles])

  useEffect(() => {
    if (__PROJECT__ !== 'sb') {
      actionsArticlesPage.initArticlesPage()
    }
  }, [actionsArticlesPage.initArticlesPage])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlePage, {}, [className])}>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList isLoading={isLoading} view={view} articles={articles} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlePage)
