import React, { memo, useCallback, useEffect } from 'react'

// import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'

import { useSearchParams } from 'react-router-dom'

import { classNames } from 'shared/lib/classNames/classNames'

import { ArticleList, EArticleView } from 'essence/article'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'

import { useActionCreatorsTyped } from 'shared/lib/store'

import { ArticleViewSelector } from 'features/ArticleViewSelector'
import { Page } from 'widgets/Page/Page'

import {
  ArticleSortSelector,
  ArticleSearch,
  EArticleSortField,
  getArticleSortSort,
  getArticleSortOrder,
  getArticleSortSearch,
  articleSortActions,
  getArticleSortType,
  ArticleTabsType
} from 'features/ArticleSort'

import { SortOrder } from 'shared/types/sort'

import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce'

import { EArticleType } from 'essence/article/model/types/article'
import { TabItem } from 'shared/ui/Tabs/Tabs'

import {
  articlesPageActions,
  articlesPageReducer,
  getArticles
} from '../../model/slice/articlesPageSlice'

import { initArticlesPage } from '../../model/services/initArticlesPage'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPageThunk'
import {
  // getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelectors'
import { fetchArticlesListThunk } from '../../model/services/fetchArticlesListThunk'

import cls from './ArticlePage.module.scss'

interface ArticlePageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer
}

const allActions = {
  ...articlesPageActions,
  fetchNextArticles: fetchNextArticlesPage,
  initArticlesPage: initArticlesPage,
  fetchArticlesList: fetchArticlesListThunk
}

const ArticlePage = ({ className }: ArticlePageProps) => {
  // const { t } = useTranslation('article')

  const actionsArticlesPage = useActionCreatorsTyped(allActions)
  const actionsArticleSort = useActionCreatorsTyped(articleSortActions)

  const articles = useSelector(getArticles.selectAll)

  const isLoading = useSelector(getArticlesPageIsLoading)
  // const error = useSelector(getArticlesPageError)
  const view = useSelector(getArticlesPageView)

  const sort = useSelector(getArticleSortSort)
  const order = useSelector(getArticleSortOrder)
  const search = useSelector(getArticleSortSearch)
  const type = useSelector(getArticleSortType)

  // параметры запроса
  const [searchParams, setSearchParams] = useSearchParams()

  const onLoadNextPart = useCallback(() => {
    actionsArticlesPage.fetchNextArticles()
  }, [actionsArticlesPage.fetchNextArticles]) // eslint-disable-line

  useEffect(() => {
    if (__PROJECT__ !== 'sb') {
      setSearchParams({ sort, order, search, type })
      actionsArticlesPage.initArticlesPage(searchParams)
    }
    // eslint-disable-next-line
  }, [
    actionsArticlesPage.initArticlesPage,
    sort,
    order,
    search,
    searchParams,
    type,
    setSearchParams
  ])

  const fetchData = () => {
    actionsArticlesPage.fetchArticlesList({ replace: true })
  }

  const debouncedFetchData = useDebounce(fetchData, 500)

  const onChangeView = useCallback(
    (view: EArticleView) => {
      actionsArticlesPage.setView(view)
    },
    [actionsArticlesPage.setView] // eslint-disable-line
  )

  const onChangeSort = useCallback(
    (newSort: EArticleSortField) => {
      actionsArticleSort.setSort(newSort)
      actionsArticlesPage.setPage(1)
      fetchData()
    },
    [actionsArticleSort.setOrder, actionsArticlesPage.setPage, fetchData] // eslint-disable-line
  )

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      actionsArticleSort.setOrder(newOrder)
      actionsArticlesPage.setPage(1)
      fetchData()
    },
    [actionsArticleSort.setOrder, actionsArticlesPage.setPage, fetchData] // eslint-disable-line
  )

  const onChangeSearch = useCallback(
    (search: string) => {
      actionsArticleSort.setSearch(search)
      actionsArticlesPage.setPage(1)
      debouncedFetchData()
    },
    // eslint-disable-next-line
    [
      actionsArticleSort.setSearch,
      actionsArticlesPage.setPage,
      debouncedFetchData
    ]
  )

  const onChangeType = useCallback(
    (tab: TabItem) => {
      // можно сделать дженерик
      actionsArticleSort.setType(tab.value as EArticleType)
      actionsArticlesPage.setPage(1)
      fetchData()
    },
    [actionsArticleSort.setType, actionsArticlesPage.setPage, fetchData] // eslint-disable-line
  )

  return (
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount={false}
    >
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlePage, {}, [className])}
      >
        <div className={cls.sortWrapper}>
          <ArticleSortSelector
            sort={sort}
            order={order}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
          />
          <ArticleViewSelector
            view={view}
            onViewClick={onChangeView}
          />
        </div>
        <ArticleSearch
          value={search}
          onChange={onChangeSearch}
        />
        <ArticleTabsType
          value={type}
          onChangeType={onChangeType}
        />

        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlePage)
