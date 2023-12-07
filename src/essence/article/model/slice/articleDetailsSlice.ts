import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ArticleDetailsSchema } from '../types/articleDetailsSchema'
import { fetchArticleByIdThunk } from '../services/fetchArticleByIdThunk'
import { IArticle } from '../types/article'

const initialState: ArticleDetailsSchema = {
  data: null,
  error: null,
  isLoading: false
}

const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticleByIdThunk.pending, (state) => {
      state.error = null
      state.isLoading = true
    })
    builder.addCase(
      fetchArticleByIdThunk.fulfilled,
      (state, action: PayloadAction<IArticle>) => {
        state.error = null
        state.isLoading = false
        state.data = action.payload
      }
    )
    builder.addCase(fetchArticleByIdThunk.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    })
  }
})

export const {
  actions: articleDetailsActions,
  reducer: articleDetailsReducer
} = articleDetailsSlice
