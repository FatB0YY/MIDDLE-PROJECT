import { StateSchema } from 'shared/lib/store'

import { EArticleType } from 'essence/article'

import { EArticleSortField } from '../const/const'

export const getArticleSortOrder = (state: StateSchema) =>
  state.articleSort?.order || 'asc'
export const getArticleSortSearch = (state: StateSchema) =>
  state.articleSort?.search ?? ''
export const getArticleSortSort = (state: StateSchema) =>
  state.articleSort?.sort || EArticleSortField.VIEWS

export const getArticleSortType = (state: StateSchema) =>
  state.articleSort?.type || EArticleType.ALL
