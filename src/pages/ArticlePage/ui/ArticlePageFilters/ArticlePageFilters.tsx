import React, { memo, useCallback, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { TabItem } from '@/shared/ui/Tabs'

import { Card } from '@/shared/ui/Card'

import { useActionCreatorsTyped } from '@/shared/lib/store'
import {
  ArticleSearch,
  ArticleSortSelector,
  ArticleTabsType,
  EArticleSortField,
  articleSortActions,
  getArticleSortOrder,
  getArticleSortSearch,
  getArticleSortSort,
  getArticleSortType
} from '@/features/ArticleSort'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { SortOrder } from '@/shared/types/sort'
import { EArticleType, EArticleView } from '@/essence/article'
import { classNames } from '@/shared/lib/classNames/classNames'

import { ArticleViewSelector } from '@/features/ArticleViewSelector'

import { fetchArticlesListThunk } from '../../model/services/fetchArticlesListThunk'
import { getArticlesPageView } from '../../model/selectors/articlesPageSelectors'
import { articlesPageActions } from '../../model/slice/articlesPageSlice'
import { initArticlesPage } from '../../model/services/initArticlesPage'

import cls from './ArticlesPageFilters.module.scss'

interface ArticlesPageFiltersProps {
  className?: string
}

const allActions = {
  ...articlesPageActions,
  initArticlesPage: initArticlesPage,
  fetchArticlesList: fetchArticlesListThunk
}

export const ArticlesPageFilters = memo(
  ({ className }: ArticlesPageFiltersProps) => {
    // const { t } = useTranslation('article')

    const actionsArticlesPage = useActionCreatorsTyped(allActions)
    const actionsArticleSort = useActionCreatorsTyped(articleSortActions)

    // const error = useSelector(getArticlesPageError)
    const view = useSelector(getArticlesPageView)

    const sort = useSelector(getArticleSortSort)
    const order = useSelector(getArticleSortOrder)
    const search = useSelector(getArticleSortSearch)
    const type = useSelector(getArticleSortType)

    // параметры запроса
    const [searchParams, setSearchParams] = useSearchParams()

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
      <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
        <div className={cls.sortWrapper}>
          <ArticleSortSelector
            order={order}
            sort={sort}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
          />
          <ArticleViewSelector
            view={view}
            onViewClick={onChangeView}
          />
        </div>
        <Card className={cls.search}>
          <ArticleSearch
            onChange={onChangeSearch}
            value={search}
            // placeholder={t('Поиск')}
          />
        </Card>
        <ArticleTabsType
          value={type}
          onChangeType={onChangeType}
          className={cls.tabs}
        />
      </div>
    )
  }
)
ArticlesPageFilters.displayName = 'ArticlesPageFilters'
