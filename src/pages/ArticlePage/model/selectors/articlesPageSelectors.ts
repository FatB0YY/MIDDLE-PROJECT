import { StateSchema } from 'shared/lib/store'
import { EArticleView } from 'essence/article'

export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading || false
export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error
export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view || EArticleView.SMALL
export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit || 9
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore
export const getArticlesPagePage = (state: StateSchema) => state.articlesPage?.page || 1
export const getArticlesPageInitied = (state: StateSchema) => state.articlesPage?._initied
