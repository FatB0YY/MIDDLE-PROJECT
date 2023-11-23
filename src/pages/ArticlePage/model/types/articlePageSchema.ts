import { EntityState } from '@reduxjs/toolkit'
import { EArticleView, IArticle } from 'essence/article'

export interface articlesPageSchema extends EntityState<IArticle> {
  isLoading?: boolean
  error?: string

  view: EArticleView
  // pagination
  page: number
  limit?: number
  hasMore: boolean

  _initied: boolean
}
