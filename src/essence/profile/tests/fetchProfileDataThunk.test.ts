import { IProfile } from 'essence/profile'
import { fetchProfileDataThunk } from '../model/services/fetchProfileDataThunk'
import axios, { AxiosStatic } from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { StateSchema } from 'shared/lib/store/index'
import { ECurrency } from 'essence/currency'
import { Country } from 'shared/const/other'

// мокаем
jest.mock('axios')

// для ts, глубокий мок
const mockedAxios = jest.mocked(axios, { shallow: false })

describe('fetchProfileDataThunk', () => {
  let dispatch: Dispatch
  let getState: () => StateSchema
  let api: jest.MockedFunctionDeep<AxiosStatic>
  let navigate: jest.MockedFn<any>
  const mockProfile: IProfile = {
    first: 'r5fft',
    lastname: 'Smith',
    age: 244,
    currency: ECurrency.USD,
    country: Country.ARMENIA,
    city: 'Moscow',
    username: 'admin213',
    avatar: 'https://yt3.ggpht.com/ytc/AAUvwngFzM_Rf6MNwOnFcuphoj93k7VFjlIrj-kSMxbh=s900-c-k-c0x00ffffff-no-rj',
  }

  beforeEach(() => {
    dispatch = jest.fn()
    getState = jest.fn()
    api = mockedAxios
    navigate = jest.fn()
  })

  test('Проверка с resolved ответом', async () => {
    // @ts-ignore
    mockedAxios.get.mockResolvedValue({ data: mockProfile })

    const thunk = fetchProfileDataThunk()

    await thunk(dispatch, getState, { api, navigate })

    expect(mockedAxios.get).toHaveBeenCalled()

    // @ts-ignore
    expect(dispatch.mock.calls).toHaveLength(2)

    // @ts-ignore
    const [start, end] = dispatch.mock.calls

    // @ts-ignore
    expect(start[0].type).toBe(fetchProfileDataThunk.pending().type)

    // @ts-ignore
    expect(end[0].type).toBe(fetchProfileDataThunk.fulfilled().type)
    expect(end[0].payload).toEqual(mockProfile)
  })

  test('Проверка с rejected  ответом', async () => {
    // @ts-ignore
    mockedAxios.get.mockResolvedValue({ status: 404 })

    const thunk = fetchProfileDataThunk()

    await thunk(dispatch, getState, { api, navigate })

    expect(mockedAxios.get).toHaveBeenCalled()

    // @ts-ignore
    expect(dispatch.mock.calls).toHaveLength(2)

    // @ts-ignore
    const [start, end] = dispatch.mock.calls

    // {type: payload, meta, error: {message: 'Rejected'}}

    // @ts-ignore
    expect(start[0].type).toBe(fetchProfileDataThunk.pending().type)
    // @ts-ignore
    expect(end[0].type).toBe(fetchProfileDataThunk.rejected().type)
    expect(end[0].payload).toBe('my rejectWithValue error!')
    expect(end[0].meta.rejectedWithValue).toBe(true)
  })
})
