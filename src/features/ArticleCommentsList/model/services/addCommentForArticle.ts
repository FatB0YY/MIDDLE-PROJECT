import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'shared/lib/store'
import { IComment } from 'essence/comment'
import { getUserAuthData } from 'essence/user'
import { getArticleDetailsData } from 'essence/article'
import { fetchCommentsByArticleIdThunk } from './fetchCommentsByArticleIdThunk'

export const addCommentForArticle = createAsyncThunk<IComment, string, ThunkConfig<string>>(
  'articleDetailsComments/addCommentForArticle',
  async (text, thunkAPI) => {
    const userData = getUserAuthData(thunkAPI.getState()).authData
    const articleId = getArticleDetailsData(thunkAPI.getState())?.id

    if (!userData || !text || !articleId) {
      return thunkAPI.rejectWithValue('my rejectWithValue error!')
    }

    try {
      const response = await thunkAPI.extra.api.post<IComment>('/comments', {
        articleId: articleId,
        userId: userData.id,
        text: text,
      })

      if (!response.data) {
        return thunkAPI.rejectWithValue('my rejectWithValue error!')
      }

      thunkAPI.dispatch(fetchCommentsByArticleIdThunk(articleId))

      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('my rejectWithValue error!')
    }
  }
)
