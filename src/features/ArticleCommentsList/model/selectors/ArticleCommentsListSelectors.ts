import { StateSchema } from 'shared/lib/store'

export const getArticleCommentsListIsLoading = (state: StateSchema) =>
  state.articleDetailsComments?.isLoading
export const getArticleCommentsListErrors = (state: StateSchema) =>
  state.articleDetailsComments?.error
