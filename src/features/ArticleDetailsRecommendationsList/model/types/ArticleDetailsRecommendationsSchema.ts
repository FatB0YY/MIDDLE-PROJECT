import { EntityState } from '@reduxjs/toolkit'
import { IArticle } from 'essence/article'

export interface ArticleDetailsRecommendationsSchema extends EntityState<IArticle> {
  isLoading?: boolean
  error?: string
}
