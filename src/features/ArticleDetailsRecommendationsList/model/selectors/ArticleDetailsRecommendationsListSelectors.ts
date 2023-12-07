import { StateSchema } from 'shared/lib/store'

export const getArticleRecommendationsListIsLoading = (state: StateSchema) =>
  state.articleDetailsRecommendations?.isLoading
export const getArticleRecommendationsListError = (state: StateSchema) =>
  state.articleDetailsRecommendations?.error
