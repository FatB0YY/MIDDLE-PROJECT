import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from 'shared/lib/store'

import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPagePage
} from '../selectors/articlesPageSelectors'
import { articlesPageActions } from '../slice/articlesPageSlice'
import { fetchArticlesListThunk } from '../services/fetchArticlesListThunk'

export const fetchNextArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('articlesPage/fetchNextArticlesPage', async (_, thunkApi) => {
  const hasMore = getArticlesPageHasMore(thunkApi.getState())
  const page = getArticlesPagePage(thunkApi.getState())
  const isLoading = getArticlesPageIsLoading(thunkApi.getState())

  if (hasMore && !isLoading) {
    thunkApi.dispatch(articlesPageActions.setPage(page + 1))
    thunkApi.dispatch(fetchArticlesListThunk({ replace: false }))
  }
})
