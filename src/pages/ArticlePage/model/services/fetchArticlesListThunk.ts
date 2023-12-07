import { createAsyncThunk } from '@reduxjs/toolkit'

import { IArticle } from 'essence/article'
import { ThunkConfig } from 'shared/lib/store'

import {
  getArticleSortOrder,
  getArticleSortSearch,
  getArticleSortSort
} from 'features/ArticleSort'
import { getArticleSortType } from 'features/ArticleSort/model/selectors/articleSortSelectors'
import { EArticleType } from 'essence/article/model/types/article'

import {
  getArticlesPageLimit,
  getArticlesPagePage
} from '../selectors/articlesPageSelectors'

interface FetchArticlesListThunkProps {
  // переменная для фильра/поиска итд (extraReducers)
  replace?: boolean
}

export const fetchArticlesListThunk = createAsyncThunk<
  IArticle[],
  FetchArticlesListThunkProps,
  ThunkConfig<string>
>('articlesPage/fetchArticlesListThunk', async (_, thunkAPI) => {
  const limit = getArticlesPageLimit(thunkAPI.getState())

  const sort = getArticleSortSort(thunkAPI.getState())
  const order = getArticleSortOrder(thunkAPI.getState())
  const search = getArticleSortSearch(thunkAPI.getState())
  const page = getArticlesPagePage(thunkAPI.getState())
  const type = getArticleSortType(thunkAPI.getState())

  try {
    const response = await thunkAPI.extra.api.get<IArticle[]>('/articles', {
      params: {
        _expand: 'user',
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
        type: type === EArticleType.ALL ? undefined : type
      }
    })

    if (!response.data) {
      return thunkAPI.rejectWithValue('my rejectWithValue error!')
    }

    return thunkAPI.fulfillWithValue(response.data)
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue('my rejectWithValue error!')
  }
})
