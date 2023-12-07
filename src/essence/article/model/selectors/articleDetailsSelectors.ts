import { StateSchema } from 'shared/lib/store'

export const getArticleDetailsState = (state: StateSchema) =>
  state.articleDetails

export const getArticleDetailsData = (state: StateSchema) =>
  state.articleDetails?.data
export const getArticleDetailsisLoading = (state: StateSchema) =>
  state.articleDetails?.isLoading
export const getArticleDetailsError = (state: StateSchema) =>
  state.articleDetails?.error
