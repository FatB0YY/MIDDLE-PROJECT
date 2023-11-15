import { IProfile, ProfileSchema } from 'essence/profile'
import { updateProfileDataThunk } from '../model/services/updateProfileDataThunk'
import axios, { AxiosStatic } from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { StateSchema } from 'shared/lib/store/index'
import { ECurrency } from 'essence/currency'
import { Country } from 'shared/const/other'
import { ValidateProfileError } from '../model/types/profile'

// мокаем
jest.mock('axios')

// для ts, глубокий мок
const mockedAxios = jest.mocked(axios, { shallow: false })

describe('updateProfileDataThunk', () => {
  let dispatch: Dispatch
  let getState: () => StateSchema
  let api: jest.MockedFunctionDeep<AxiosStatic>
  let navigate: jest.MockedFn<any>

  const data = {
    age: 24,
    avatar: 'rfrfr',
    city: 'M',
    country: Country.ARMENIA,
    currency: ECurrency.RUB,
    first: 'Joi',
    lastname: 'Smith',
    username: 'Admin',
  }

  const dataWithNoValid = {
    age: 'no valid',
    avatar: 'rfrfr',
    city: 'M',
    country: Country.ARMENIA,
    currency: ECurrency.RUB,
    first: '',
    lastname: '',
    username: 'Admin',
  }

  beforeEach(() => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data,
      },
    }

    dispatch = jest.fn()
    getState = jest.fn(() => state as StateSchema)
    api = mockedAxios
    navigate = jest.fn()
  })

  test('Проверка с resolved ответом', async () => {
    // @ts-ignore
    mockedAxios.put.mockResolvedValue({ data })

    const thunk = updateProfileDataThunk()

    await thunk(dispatch, getState, { api, navigate })

    expect(mockedAxios.put).toHaveBeenCalled()

    // @ts-ignore
    expect(dispatch.mock.calls).toHaveLength(2)

    // @ts-ignore
    const [start, end] = dispatch.mock.calls

    // @ts-ignore
    expect(start[0].type).toBe(updateProfileDataThunk.pending().type)

    // @ts-ignore
    expect(end[0].type).toBe(updateProfileDataThunk.fulfilled().type)
    expect(end[0].payload).toEqual(data)
  })

  test('Проверка с rejected ответом из-за валидации', async () => {
    // @ts-ignore
    mockedAxios.put.mockResolvedValue({ data: dataWithNoValid })

    const thunk = updateProfileDataThunk()

    // @ts-ignore
    const x = await thunk(dispatch, getState, { api, navigate })
    // @ts-ignore
    expect(dispatch.mock.calls).toHaveLength(2)

    // @ts-ignore
    const [start, end] = dispatch.mock.calls

    console.log('start', start)
    console.log('end', end)

    // @ts-ignore
    expect(start[0].type).toBe(updateProfileDataThunk.pending().type)
    // @ts-ignore
    expect(end[0].type).toBe(updateProfileDataThunk.rejected().type)
    expect(end[0].payload).toEqual([ValidateProfileError.SERVER_ERROR])
    expect(end[0].meta.rejectedWithValue).toBe(true)
  })
})
