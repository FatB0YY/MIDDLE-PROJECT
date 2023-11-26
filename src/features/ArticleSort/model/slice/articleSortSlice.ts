import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ArticleSortSchema, EArticleSortField } from '../types/articlesort'
import { EArticleType } from 'essence/article/model/types/article'

const initialState: ArticleSortSchema = {
  order: 'asc',
  search: '',
  sort: EArticleSortField.VIEWS,
  type: EArticleType.ALL,
}

const articleSortSlice = createSlice({
  name: 'articleSortSlice',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.order = action.payload
    },
    setSort: (state, action: PayloadAction<EArticleSortField>) => {
      state.sort = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setType: (state, action: PayloadAction<EArticleType>) => {
      state.type = action.payload
    },
  },
})

export const { actions: articleSortActions, reducer: articleSortReducer } = articleSortSlice
