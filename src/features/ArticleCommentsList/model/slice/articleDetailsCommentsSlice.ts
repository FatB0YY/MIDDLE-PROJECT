import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { IComment } from 'essence/comment'
import { StateSchema } from 'shared/lib/store'
import { articleDetailsCommentsSchema } from '../types/articleDetailsCommentsSchema'
import { fetchCommentsByArticleIdThunk } from '../services/fetchCommentsByArticleIdThunk'

const commentsAdapter = createEntityAdapter<IComment>({
  selectId: (comment) => comment.id,
})

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsComments || commentsAdapter.getInitialState()
)

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsCommentsSlice',
  initialState: commentsAdapter.getInitialState<articleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByArticleIdThunk.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(fetchCommentsByArticleIdThunk.fulfilled, (state, action: PayloadAction<IComment[]>) => {
      state.error = undefined
      state.isLoading = false

      commentsAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchCommentsByArticleIdThunk.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const { actions: articleDetailsCommentsActions, reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice
