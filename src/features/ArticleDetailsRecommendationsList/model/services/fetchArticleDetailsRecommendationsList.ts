import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'shared/lib/store'
import { IArticle } from 'essence/article'

export const fetchArticleDetailsRecommendationsListThunk = createAsyncThunk<IArticle[], void, ThunkConfig<string>>(
  'fetchArticleDetailsRecommendationsListThunk',
  async (_, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.get<IArticle[]>('/articles', {
        params: {
          _limit: 4,
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

// Если бы был реальный бэкенд, запросы был бы другой.
// Т.е запрос на странице со списком статьей, это запросы который отдает нам данные
// с пагинацией, фильтрами, поиском итд.
// А для рекомендация это конкретные статьи, который подобрал алгоритм на основе машинного обучения например
