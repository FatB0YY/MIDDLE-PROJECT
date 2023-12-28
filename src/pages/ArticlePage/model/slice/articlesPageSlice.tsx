import {
  PayloadAction,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'

import { EArticleView, IArticle } from '@/essence/article'
import { StateSchema } from '@/shared/lib/store'

import { ARTICLEVIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

import { articlesPageSchema } from '../types/articlePageSchema'
import { fetchArticlesListThunk } from '../services/fetchArticlesListThunk'

const articlesAdapter = createEntityAdapter<IArticle>({
  selectId: (article) => article.id
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState()
)

const articlesPageSlice = createSlice({
  name: 'articlePageSlice',
  initialState: articlesAdapter.getInitialState<articlesPageSchema>({
    isLoading: false,
    error: undefined,
    view: EArticleView.SMALL,
    entities: {},
    ids: [],
    hasMore: true,
    limit: 0,
    page: 1,
    _initiated: false
  }),
  reducers: {
    setView: (state, action: PayloadAction<EArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLEVIEW_LOCALSTORAGE_KEY, action.payload)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLEVIEW_LOCALSTORAGE_KEY
      ) as EArticleView
      state.view = view
      state.limit = view === EArticleView.BIG ? 4 : 9
      state._initiated = true
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticlesListThunk.pending, (state, action) => {
      state.error = undefined
      state.isLoading = true

      if (action.meta.arg.replace) {
        articlesAdapter.removeAll(state)
      }
    })
    builder.addCase(fetchArticlesListThunk.fulfilled, (state, action) => {
      state.error = undefined
      state.isLoading = false

      // если лимит 10, а пришло 5 объектов, то бд пуста и больше нет объектов
      state.hasMore = action.payload.length >= state.limit

      if (action.meta.arg.replace) {
        // заменяем все
        articlesAdapter.setAll(state, action.payload)
      } else {
        // данные не полностью затираем, а добавляем в конец
        articlesAdapter.addMany(state, action.payload)
      }
    })
    builder.addCase(fetchArticlesListThunk.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    })
  }
})

export const { actions: articlesPageActions, reducer: articlesPageReducer } =
  articlesPageSlice
