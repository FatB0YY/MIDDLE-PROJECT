///fetchArticleByIdThunk

import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'shared/lib/store'
import { IArticle } from '../types/article'

export const fetchArticleByIdThunk = createAsyncThunk<IArticle, string, ThunkConfig<string>>(
  'articleDetails/fetchArticleByIdThunk',
  async (articleId, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.get<IArticle>(`/articles/${articleId}`, {
        params: {
          _expand: 'user',
        },
      })

      if (!response.data) {
        return thunkAPI.rejectWithValue('my rejectWithValue error!')
      }

      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('my rejectWithValue error!')
    }
  }
)
