import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from 'shared/lib/store'

import { articleSortActions } from 'features/ArticleSort/model/slice/articleSortSlice'
import { EArticleSortField } from 'features/ArticleSort'
import { EArticleType } from 'essence/article/model/const/const'

import { getArticlesPageInitied } from '../selectors/articlesPageSelectors'
import { articlesPageActions } from '../slice/articlesPageSlice'

import { fetchArticlesListThunk } from './fetchArticlesListThunk'

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
  const _initiated = getArticlesPageInitied(thunkApi.getState())

  if (!_initiated) {
    /**
     * urlParamsMap: Это объект, который сопоставляет параметры URL (ключи)
     * с соответствующими действиями Redux (значения).
     * Каждому параметру URL соответствует функция, которая вызывает соответствующее действие articleSortActions.
     * @param params
     */
    const urlParamsMap: Record<string, (value: string) => void> = {
      order: (value) =>
        thunkApi.dispatch(articleSortActions.setOrder(value as 'desc' | 'asc')),
      sort: (value) =>
        thunkApi.dispatch(
          articleSortActions.setSort(value as EArticleSortField)
        ),
      search: (value) => thunkApi.dispatch(articleSortActions.setSearch(value)),
      type: (value) =>
        thunkApi.dispatch(articleSortActions.setType(value as EArticleType))
      // ...
    }

    // Проходимся по всем параметрам URL и диспатчим соответствующие действия
    searchParams.forEach((value, key) => {
      const action = urlParamsMap[key]
      if (action) {
        action(value)
      }
    })

    thunkApi.dispatch(articlesPageActions.initState())
    thunkApi.dispatch(fetchArticlesListThunk({ replace: false }))
  }
})
