import { ECurrency } from 'essence/currency'
import { Country } from 'shared/const/other'

import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk'
import { updateProfileDataThunk } from 'features/EditableProfileCard/model/services/updateProfileDataThunk'

import { IProfile, ValidateProfileError } from '../model/types/profile'

describe('updateProfileDataThunk', () => {
  const data: IProfile = {
    age: 24,
    avatar: 'rfrfr',
    city: 'M',
    country: Country.ARMENIA,
    currency: ECurrency.RUB,
    first: 'Joi',
    lastname: 'Smith',
    username: 'Admin',
    id: '1'
  }

  test('Проверка с resolved ответом', async () => {
    const thunk = new TestAsyncThunk(updateProfileDataThunk, {
      profile: {
        form: data
      }
    })

    thunk.api.put.mockResolvedValue({ data })

    // получаем dispatch[]
    const result = await thunk.callThunk()

    // проверяем что put был вызван
    expect(thunk.api.put).toHaveBeenCalled()
    // проверяем что длина вызовов всех === 2
    expect(result).toHaveLength(2)

    expect(result[0].type).toBe(updateProfileDataThunk.pending.type)

    expect(result[1].type).toBe(updateProfileDataThunk.fulfilled.type)
    expect(result[1].payload).toEqual(data)
  })

  test('Проверка с rejected ответом', async () => {
    const thunk = new TestAsyncThunk(updateProfileDataThunk, {
      profile: {
        form: data
      }
    })
    thunk.api.put.mockResolvedValue({ status: 403 })

    // получаем dispatch[]
    const result = await thunk.callThunk()
    // проверяем что длина вызовов всех === 2
    expect(result).toHaveLength(2)

    expect(result[0].type).toBe(updateProfileDataThunk.pending.type)

    expect(result[1].type).toBe(updateProfileDataThunk.rejected.type)
    expect(result[1].payload).toEqual([ValidateProfileError.SERVER_ERROR])
    expect(result[1].meta.rejectedWithValue).toBe(true)
  })

  test('Проверка с rejected ответом из-за валидации', async () => {
    const thunk = new TestAsyncThunk(updateProfileDataThunk, {
      profile: {
        form: { ...data, lastname: '' }
      }
    })

    // получаем dispatch[]
    const result = await thunk.callThunk()

    // проверяем что длина вызовов всех === 2
    expect(result).toHaveLength(2)

    expect(result[0].type).toBe(updateProfileDataThunk.pending.type)

    expect(result[1].type).toBe(updateProfileDataThunk.rejected.type)
    expect(result[1].payload).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA
    ])
    expect(result[1].meta.rejectedWithValue).toBe(true)
  })
})
