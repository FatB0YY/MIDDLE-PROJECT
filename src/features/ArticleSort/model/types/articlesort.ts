import { EArticleType } from 'essence/article/model/types/article'
import { SortOrder } from 'shared/types/sort'

export enum EArticleSortField {
  VIEWS = 'views',
  TITLE = 'title',
  CREATED = 'created'
}

export interface ArticleSortSchema {
  order: SortOrder
  sort: EArticleSortField
  search: string
  type: EArticleType
}
