import { IUser, userActions } from '@/essence/user'

import { TestAsyncThunk } from '@/shared/config/tests/TestAsyncThunk/TestAsyncThunk'

import {
  ILoginByUsername,
  loginByUsernameThunk
} from '../model/services/loginByUsernameThunk'

describe('loginByUsernameThunk', () => {
  const mockUser: IUser = { id: '1', username: 'Joi' }
  const mockLoginData: ILoginByUsername = { username: 'admin', password: '123' }

  test('Проверка с resolved ответом', async () => {
    const thunk = new TestAsyncThunk(loginByUsernameThunk)
    thunk.api.post.mockResolvedValue({ data: mockUser })

    // получаем dispatch[]
    const result = await thunk.callThunk(mockLoginData)

    // проверяем что post был вызван
    expect(thunk.api.post).toHaveBeenCalled()
    // проверяем что длина вызовов всех dispatch === 3
    expect(result).toHaveLength(3)

    // что экшн вызвался действиетлньо с этими данными
    const expectedPayload = userActions.setAuthData(mockUser).payload
    expect(thunk.dispatch[1].payload).toEqual(expectedPayload)

    expect(result[0].type).toBe(loginByUsernameThunk.pending.type)

    expect(result[1].type).toBe(userActions.setAuthData(mockUser).type)
    expect(result[1].payload).toEqual(mockUser)

    expect(result[2].type).toBe(loginByUsernameThunk.fulfilled.type)
    expect(result[2].payload).toEqual(mockUser)
  })

  test('Проверка с rejected  ответом', async () => {
    const thunk = new TestAsyncThunk(loginByUsernameThunk)
    thunk.api.post.mockResolvedValue({ status: 403 })

    // получаем dispatch[]
    const result = await thunk.callThunk(mockLoginData)

    // проверяем что post был вызван
    expect(thunk.api.post).toHaveBeenCalled()
    // проверяем что длина вызовов всех dispatch === 2
    expect(result).toHaveLength(2)

    expect(result[0].type).toBe(loginByUsernameThunk.pending.type)

    expect(result[1].type).toBe(loginByUsernameThunk.rejected.type)
    expect(result[1].payload).toEqual('my rejectWithValue error!')
    expect(result[1].meta.rejectedWithValue).toBe(true)
  })
})
