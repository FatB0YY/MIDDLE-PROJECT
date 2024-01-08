import { TestAsyncThunk } from '@/shared/config/tests/TestAsyncThunk/TestAsyncThunk'

import { fetchArticleByIdThunk } from '../model/services/fetchArticleByIdThunk'
import { IArticle } from '../model/types/article'

import { EArticleBlockType, EArticleType } from '../model/const/const'

describe('fetchArticleByIdThunk', () => {
  const data: IArticle = {
    views: 1000,
    createdAt: '23.34.34',
    id: '1',
    img: 'trrt',
    subtitle: 'rgtg',
    title: 'rrg',
    type: [EArticleType.IT],
    user: {
      id: '1',
      username: 'admin'
    },
    blocks: [
      {
        code: 'rfr',
        type: EArticleBlockType.CODE,
        id: '1'
      }
    ]
  }

  test('Проверка с resolved ответом', async () => {
    const thunk = new TestAsyncThunk(fetchArticleByIdThunk)
    thunk.api.get.mockResolvedValue({ data })

    // получаем dispatch[]
    const result = await thunk.callThunk('1')

    // проверяем что get был вызван
    expect(thunk.api.get).toHaveBeenCalled()
    // проверяем что длина вызовов всех dispatch === 2
    expect(result).toHaveLength(2)

    expect(result[0].type).toBe(fetchArticleByIdThunk.pending.type)
    expect(result[1].type).toBe(fetchArticleByIdThunk.fulfilled.type)
    expect(result[1].payload).toEqual(data)
  })

  test('Проверка с rejected  ответом', async () => {
    const thunk = new TestAsyncThunk(fetchArticleByIdThunk)
    thunk.api.get.mockResolvedValue({ status: 403 })

    // получаем dispatch[]
    const result = await thunk.callThunk('1')

    // проверяем что get был вызван
    expect(thunk.api.get).toHaveBeenCalled()
    // проверяем что длина вызовов всех dispatch === 2
    expect(result).toHaveLength(2)

    expect(result[0].type).toBe(fetchArticleByIdThunk.pending.type)
    expect(result[1].type).toBe(fetchArticleByIdThunk.rejected.type)
    expect(result[1].payload).toBe('my rejectWithValue error!')
    expect(result[1].meta.rejectedWithValue).toBe(true)
  })
})
