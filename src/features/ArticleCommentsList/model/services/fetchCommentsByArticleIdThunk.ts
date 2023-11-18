import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'shared/lib/store'
import { IComment } from 'essence/comment'

export const fetchCommentsByArticleIdThunk = createAsyncThunk<IComment[], string, ThunkConfig<string>>(
  'articleDetailsComments/fetchCommentsByArticleIdThunk',
  async (articleId, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.get<IComment[]>('/comments', {
        params: {
          articleId,
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
