import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { IArticle } from 'essence/article'
import { StateSchema } from 'shared/lib/store'

import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema'
import { fetchArticleDetailsRecommendationsListThunk } from '../services/fetchArticleDetailsRecommendationsList'

const recommendationsAdapter = createEntityAdapter<IArticle>({
  selectId: (article) => article.id
})

export const getArticleRecommendations =
  recommendationsAdapter.getSelectors<StateSchema>(
    (state) =>
      state.articleDetailsRecommendations ||
      recommendationsAdapter.getInitialState()
  )

const articleDetailsPageRecommendationsSlice = createSlice({
  name: 'articleDetailsPageRecommendationsSlice',
  initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
      {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {}
      }
    ),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleDetailsRecommendationsListThunk.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchArticleDetailsRecommendationsListThunk.fulfilled,
        (state, action) => {
          state.isLoading = false
          recommendationsAdapter.setAll(state, action.payload)
        }
      )
      .addCase(
        fetchArticleDetailsRecommendationsListThunk.rejected,
        (state, action) => {
          state.isLoading = false
          state.error = action.payload
        }
      )
  }
})

export const { reducer: articleDetailsPageRecommendationsReducer } =
  articleDetailsPageRecommendationsSlice
