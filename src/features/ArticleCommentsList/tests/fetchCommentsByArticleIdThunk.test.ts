import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk'
import { IComment } from 'essence/comment'

import { fetchCommentsByArticleIdThunk } from '../model/services/fetchCommentsByArticleIdThunk'

describe('fetchCommentsByArticleIdThunk', () => {
  const data: IComment = {
    id: '1',
    text: 'rfr',
    user: {
      id: '1',
      username: 'admin',
      avatar: 'rfr'
    }
  }

  test('Проверка с resolved ответом', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleIdThunk)
    thunk.api.get.mockResolvedValue({ data })

    // получаем dispatch[]
    const result = await thunk.callThunk('1')

    // проверяем что get был вызван
    expect(thunk.api.get).toHaveBeenCalled()
    // проверяем что длина вызовов всех dispatch === 2
    expect(result).toHaveLength(2)

    expect(result[0].type).toBe(fetchCommentsByArticleIdThunk.pending.type)
    expect(result[1].type).toBe(fetchCommentsByArticleIdThunk.fulfilled.type)
    expect(result[1].payload).toEqual(data)
  })

  test('Проверка с rejected ответом', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleIdThunk)
    thunk.api.get.mockResolvedValue({ status: 403 })

    // получаем dispatch[]
    const result = await thunk.callThunk('1')

    // проверяем что get был вызван
    expect(thunk.api.get).toHaveBeenCalled()
    // проверяем что длина вызовов всех dispatch === 2
    expect(result).toHaveLength(2)

    expect(result[0].type).toBe(fetchCommentsByArticleIdThunk.pending.type)
    expect(result[1].type).toBe(fetchCommentsByArticleIdThunk.rejected.type)
    expect(result[1].payload).toBe('my rejectWithValue error!')
    expect(result[1].meta.rejectedWithValue).toBe(true)
  })
})
