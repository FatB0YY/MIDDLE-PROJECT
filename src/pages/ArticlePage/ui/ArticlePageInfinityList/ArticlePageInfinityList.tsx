import React from 'react'
import { useSelector } from 'react-redux'

import { ArticleList } from '@/essence/article'
import { PageError } from '@/widgets/PageError'

import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/articlesPageSelectors'
import { getArticles } from '../../model/slice/articlesPageSlice'

export const ArticlePageInfinityList = () => {
  const error = useSelector(getArticlesPageError)
  const view = useSelector(getArticlesPageView)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const articles = useSelector(getArticles.selectAll)

  if (error) {
    return <PageError />
  }

  return (
    <ArticleList
      articles={articles}
      isVirtualizationList={false}
      isLoading={isLoading}
      target='_blank'
      view={view}
    />
  )
}
