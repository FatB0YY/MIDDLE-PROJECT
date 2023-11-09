import { IUser } from 'essence/user'
import { ILoginByUsername, loginByUsernameThunk } from '../model/services/loginByUsernameThunk'
import axios, { AxiosStatic } from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { StateSchema } from 'shared/lib/store/index'
import { $api } from 'shared/api/api'

// мокаем
jest.mock('axios')

// для ts, глубокий мок
const mockedAxios = jest.mocked(axios, { shallow: false })

describe('loginByUsernameThunk', () => {
  let dispatch: Dispatch
  let getState: () => StateSchema
  let api: jest.MockedFunctionDeep<AxiosStatic>
  let navigate: jest.MockedFn<any>
  const mockUser: IUser = { id: '1', username: 'Joi' }
  const mockLoginData: ILoginByUsername = { username: 'admin', password: '123' }

  beforeEach(() => {
    dispatch = jest.fn()
    getState = jest.fn()
    api = mockedAxios
    navigate = jest.fn()
  })

  test('Проверка с resolved ответом', async () => {
    // mockedAxios.post.mockReturnValue(Promise.resolve({ data: mockUser }))
    // @ts-ignore
    mockedAxios.post.mockResolvedValue({ data: mockUser })

    const thunk = loginByUsernameThunk(mockLoginData)

    await thunk(dispatch, getState, { api, navigate })

    expect(mockedAxios.post).toHaveBeenCalled()

    // что экшн вызвался действиетлньо с этими данными
    // expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(mockUser))

    // @ts-ignore
    expect(dispatch.mock.calls).toHaveLength(3)

    // @ts-ignore
    const [start, middle, end] = dispatch.mock.calls

    // @ts-ignore
    expect(start[0].type).toBe(loginByUsernameThunk.pending().type)

    // expect(middle[0].type).toBe(userActions.setAuthData(mockUser).type)
    expect(middle[0].payload).toBe(mockUser)

    // @ts-ignore
    expect(end[0].type).toBe(loginByUsernameThunk.fulfilled().type)
    expect(end[0].payload).toBe(mockUser)
  })

  test('Проверка с rejected  ответом', async () => {
    // @ts-ignore
    mockedAxios.post.mockResolvedValue({ status: 404 })

    const thunk = loginByUsernameThunk(mockLoginData)

    await thunk(dispatch, getState, { api, navigate })

    expect(mockedAxios.post).toHaveBeenCalled()

    // @ts-ignore
    expect(dispatch.mock.calls).toHaveLength(2)

    // @ts-ignore
    const [start, end] = dispatch.mock.calls

    // {type: payload, meta, error: {message: 'Rejected'}}

    // @ts-ignore
    expect(start[0].type).toBe(loginByUsernameThunk.pending().type)
    // @ts-ignore
    expect(end[0].type).toBe(loginByUsernameThunk.rejected().type)
    expect(end[0].payload).toBe('my rejectWithValue error!')
    expect(end[0].meta.rejectedWithValue).toBe(true)
  })
})
