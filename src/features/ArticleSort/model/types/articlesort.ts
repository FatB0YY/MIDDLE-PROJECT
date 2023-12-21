import { SortOrder } from 'shared/types/sort'
import { EArticleType } from 'essence/article'

import { EArticleSortField } from '../const/const'

export interface ArticleSortSchema {
  order: SortOrder
  sort: EArticleSortField
  search: string
  type: EArticleType
}
