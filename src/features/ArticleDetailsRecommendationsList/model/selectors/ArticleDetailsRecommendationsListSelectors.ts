import { StateSchema } from 'shared/lib/store'

export const getArticleRecommendationsListIsLoading = (state: StateSchema) =>
  state.articleDetailaRecommendations?.isLoading
export const getArticleRecommendationsListError = (state: StateSchema) => state.articleDetailaRecommendations?.error
