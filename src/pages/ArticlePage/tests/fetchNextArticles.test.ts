import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk'
import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPageThunk'
import { fetchArticlesListThunk } from '../model/services/fetchArticlesListThunk'

jest.mock('../model/services/fetchArticlesListThunk.ts')

describe('fetchNextArticlesPage', () => {
  test('Проверка с resolved ответом', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
      },
    })

    // получаем dispatch[]
    const result = await thunk.callThunk()

    // проверяем что длина вызовов всех dispatch === 4
    expect(result).toHaveLength(4)

    expect(fetchArticlesListThunk).toHaveBeenCalledWith({ page: 3 })
  })
  test('Проверка с rejected ответом', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
      },
    })

    // получаем dispatch[]
    const result = await thunk.callThunk()

    // проверяем что длина вызовов всех dispatch === 2
    expect(result).toHaveLength(2)

    expect(fetchArticlesListThunk).not.toHaveBeenCalled()
  })
})
