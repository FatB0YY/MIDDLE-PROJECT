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
import {
  ArticleSortSelector,
  ArticleSearch,
  EArticleSortField,
  getArticleSortSort,
  getArticleSortOrder,
  getArticleSortSearch,
} from 'features/ArticleSort'
import { articleSortActions } from 'features/ArticleSort'
import { SortOrder } from 'shared/types/sort'
import { fetchArticlesListThunk } from 'pages/ArticlePage/model/services/fetchArticlesListThunk'
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce'
import { useSearchParams } from 'react-router-dom'
import { EArticleType } from 'essence/article/model/types/article'
import { TabItem } from 'shared/ui/Tabs/Tabs'
import { getArticleSortType } from 'features/ArticleSort'
import { ArticleTabsType } from 'features/ArticleSort'

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
  fetchArticlesList: fetchArticlesListThunk,
}

const ArticlePage: FC<ArticlePageProps> = ({ className }) => {
  const { t } = useTranslation('article')

  const actionsArticlesPage = useActionCreatorsTyped(allActions)
  const actionsArticleSort = useActionCreatorsTyped(articleSortActions)

  const articles = useSelector(getArticles.selectAll)

  const isLoading = useSelector(getArticlesPageIsLoading)
  const error = useSelector(getArticlesPageError)
  const view = useSelector(getArticlesPageView)

  const sort = useSelector(getArticleSortSort)
  const order = useSelector(getArticleSortOrder)
  const search = useSelector(getArticleSortSearch)
  const type = useSelector(getArticleSortType)

  // параметры запроса
  const [searchParams, setSearchParams] = useSearchParams()

  const onLoadNextPart = useCallback(() => {
    actionsArticlesPage.fetchNextArticles()
  }, [actionsArticlesPage.fetchNextArticles])

  useEffect(() => {
    if (__PROJECT__ !== 'sb') {
      setSearchParams({ sort, order, search, type })
      actionsArticlesPage.initArticlesPage(searchParams)
    }
  }, [actionsArticlesPage.initArticlesPage, sort, order, search, searchParams, type])

  const fetchData = () => {
    actionsArticlesPage.fetchArticlesList({ replace: true })
  }

  const debouncedFetchData = useDebounce(fetchData, 500)

  const onChangeView = useCallback(
    (view: EArticleView) => {
      actionsArticlesPage.setView(view)
    },
    [actionsArticlesPage.setView]
  )

  const onChangeSort = useCallback(
    (newSort: EArticleSortField) => {
      actionsArticleSort.setSort(newSort as EArticleSortField)
      actionsArticlesPage.setPage(1)
      fetchData()
    },
    [actionsArticleSort.setSort, fetchData]
  )

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      actionsArticleSort.setOrder(newOrder as SortOrder)
      actionsArticlesPage.setPage(1)
      fetchData()
    },
    [actionsArticleSort.setOrder, fetchData]
  )

  const onChangeSearch = useCallback(
    (search: string) => {
      actionsArticleSort.setSearch(search)
      actionsArticlesPage.setPage(1)
      debouncedFetchData()
    },
    [actionsArticleSort.setSearch, debouncedFetchData]
  )

  const onChangeType = useCallback(
    (tab: TabItem) => {
      // можно сделать дженерик
      actionsArticleSort.setType(tab.value as EArticleType)
      actionsArticlesPage.setPage(1)
      fetchData()
    },
    [actionsArticleSort.setType, debouncedFetchData]
  )

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlePage, {}, [className])}>
        <div className={cls.sortWrapper}>
          <ArticleSortSelector sort={sort} order={order} onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
          <ArticleViewSelector view={view} onViewClick={onChangeView} />
        </div>
        <ArticleSearch value={search} onChange={onChangeSearch} />
        <ArticleTabsType value={type} onChangeType={onChangeType} />

        <ArticleList isLoading={isLoading} view={view} articles={articles} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlePage)
