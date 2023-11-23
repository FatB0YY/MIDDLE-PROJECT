import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'shared/lib/store'
import { articlesPageActions } from '../slice/articlesPageSlice'
import { fetchArticlesListThunk } from './fetchArticlesListThunk'
import { getArticlesPageInitied } from '../selectors/articlesPageSelectors'

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/initArticlesPage',
  async (_, thunkApi) => {
    const _initied = getArticlesPageInitied(thunkApi.getState())

    if (!_initied) {
      thunkApi.dispatch(articlesPageActions.initState())
      thunkApi.dispatch(fetchArticlesListThunk({ page: 1 }))
    }
  }
)
