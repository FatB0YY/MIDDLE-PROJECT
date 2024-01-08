import { TestAsyncThunk } from '@/shared/config/tests/TestAsyncThunk/TestAsyncThunk'
import { EArticleType, EArticleView } from '@/essence/article'
import { EArticleSortField } from '@/features/ArticleSort'

import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPageThunk'
import { articlesPageActions } from '../model/slice/articlesPageSlice'

jest.mock('../model/services/fetchArticlesListThunk.ts')

describe('fetchNextArticlesPage', () => {
  test('Проверка с resolved ответом', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        hasMore: true,
        entities: {},
        ids: [],
        isLoading: false,
        page: 1,
        view: EArticleView.BIG,
        _initiated: false,
        limit: 6,
        error: undefined
      },
      articleSort: {
        order: 'asc',
        search: '',
        type: EArticleType.ALL,
        sort: EArticleSortField.CREATED
      }
    })

    // получаем dispatch[]
    const result = await thunk.callThunk()

    // проверяем что длина вызовов всех dispatch === 4
    expect(result).toHaveLength(4)

    expect(result[0].type).toBe(fetchNextArticlesPage.pending.type)

    expect(result[1].type).toBe(articlesPageActions.setPage.type)
    expect(result[1].payload).toBe(2)

    expect(result[3].type).toBe(fetchNextArticlesPage.fulfilled.type)
  })

  test('Проверка с !hasMore and isLoading', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        hasMore: false,
        entities: {},
        ids: [],
        isLoading: true,
        page: 1,
        view: EArticleView.BIG,
        _initiated: false,
        limit: 6,
        error: 'my error'
      },
      articleSort: {
        order: 'asc',
        search: '',
        type: EArticleType.ALL,
        sort: EArticleSortField.CREATED
      }
    })

    // получаем dispatch[]
    const result = await thunk.callThunk()

    // проверяем что длина вызовов всех dispatch === 2
    expect(result).toHaveLength(2)

    expect(result[0].type).toBe(fetchNextArticlesPage.pending.type)

    expect(result[1].type).toBe(fetchNextArticlesPage.fulfilled.type)
  })
})
