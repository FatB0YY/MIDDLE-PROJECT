import { TestAsyncThunk } from '@/shared/config/tests/TestAsyncThunk/TestAsyncThunk'
import { IComment } from '@/essence/comment'

import { addCommentForArticle } from '../model/services/addCommentForArticle'

describe('addCommentForArticle', () => {
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
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      user: {
        _initiated: true,
        authData: {
          id: '1',
          username: 'admin'
        }
      },
      articleDetails: {
        data: {
          id: '1'
        }
      }
    })
    thunk.api.post.mockResolvedValue({ data })

    // получаем dispatch[]
    const result = await thunk.callThunk('Text Text Text Text Text Text')

    // проверяем что post был вызван
    expect(thunk.api.post).toHaveBeenCalled()
    // проверяем что длина вызовов всех dispatch === 3
    expect(result).toHaveLength(3)

    expect(result[0].type).toBe(addCommentForArticle.pending.type)

    // Проверка второго dispatch
    // expect(result[1](() => {})).resolves.toBe({})
    expect(result[1]).toBeInstanceOf(Function)

    expect(result[2].type).toBe(addCommentForArticle.fulfilled.type)
    expect(result[2].payload).toEqual(data)
  })

  test('Проверка с rejected  ответом', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      user: {
        _initiated: true,
        authData: {
          id: '1',
          username: 'admin'
        }
      },
      articleDetails: {
        data: {
          id: '1'
        }
      }
    })
    thunk.api.post.mockResolvedValue({ status: 403 })

    // получаем dispatch[]
    const result = await thunk.callThunk(
      'Text rnjrgjtg neikd ijneriuf hfr iehifvn igrgtg'
    )

    // проверяем что post был вызван
    expect(thunk.api.post).toHaveBeenCalled()
    // проверяем что длина вызовов всех dispatch === 2
    expect(result).toHaveLength(2)

    expect(result[0].type).toBe(addCommentForArticle.pending.type)
    expect(result[1].type).toBe(addCommentForArticle.rejected.type)
    expect(result[1].payload).toBe('my rejectWithValue error!')
    expect(result[1].meta.rejectedWithValue).toBe(true)
  })
})
