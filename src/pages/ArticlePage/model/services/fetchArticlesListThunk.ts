import { createAsyncThunk } from '@reduxjs/toolkit'
import { IArticle } from 'essence/article'
import { ThunkConfig } from 'shared/lib/store'
import { getArticlesPageLimit } from '../selectors/articlesPageSelectors'

interface FetchArticlesListThunkProps {
  page?: number
}

export const fetchArticlesListThunk = createAsyncThunk<IArticle[], FetchArticlesListThunkProps, ThunkConfig<string>>(
  'articlesPage/fetchArticlesListThunk',
  async (props, thunkAPI) => {
    const { page = 1 } = props
    const limit = getArticlesPageLimit(thunkAPI.getState())

    try {
      const response = await thunkAPI.extra.api.get<IArticle[]>(`/articles`, {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
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
