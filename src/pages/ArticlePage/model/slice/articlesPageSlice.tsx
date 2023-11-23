import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { EArticleView, IArticle } from 'essence/article'
import { StateSchema } from 'shared/lib/store'
import { articlesPageSchema } from '../types/articlePageSchema'
import { fetchArticlesListThunk } from '../services/fetchArticlesListThunk'
import { ARTICLEVIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

const articlesAdapter = createEntityAdapter<IArticle>({
  selectId: (article) => article.id,
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
    limit: undefined,
    page: 1,
    _initied: false,
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
      const view = localStorage.getItem(ARTICLEVIEW_LOCALSTORAGE_KEY) as EArticleView
      state.view = view
      state.limit = view === EArticleView.BIG ? 4 : 9
      state._initied = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticlesListThunk.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(fetchArticlesListThunk.fulfilled, (state, action: PayloadAction<IArticle[]>) => {
      state.error = undefined
      state.isLoading = false

      // данные не полность затираем, а добавляем в конец
      articlesAdapter.addMany(state, action.payload)
      // если прилетел массив, в котором есть хотя бы 1 эл, то данные еще есть
      state.hasMore = action.payload.length > 0
    })
    builder.addCase(fetchArticlesListThunk.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    })
  },
})

export const { actions: articlesPageActions, reducer: articlesPageReducer } = articlesPageSlice
