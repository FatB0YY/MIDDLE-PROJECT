import { ECurrency } from '@/essence/currency'
import { Country } from '@/shared/const/other'
import { TestAsyncThunk } from '@/shared/config/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchProfileDataThunk } from '@/features/EditableProfileCard'

import { IProfile } from '../model/types/profile'

describe('fetchProfileDataThunk', () => {
  const data: IProfile = {
    first: 'r5fft',
    lastname: 'Smith',
    age: 244,
    currency: ECurrency.USD,
    country: Country.ARMENIA,
    city: 'Moscow',
    username: 'admin213',
    avatar:
      'https://yt3.ggpht.com/ytc/AAUvwngFzM_Rf6MNwOnFcuphoj93k7VFjlIrj-kSMxbh=s900-c-k-c0x00ffffff-no-rj',
    id: '1'
  }

  test('Проверка с resolved ответом', async () => {
    const thunk = new TestAsyncThunk(fetchProfileDataThunk)

    thunk.api.get.mockResolvedValue({ data })

    // получаем dispatch[]
    const result = await thunk.callThunk('1')

    // проверяем что get был вызван
    expect(thunk.api.get).toHaveBeenCalled()
    // проверяем что длина вызовов всех dispatch === 2
    expect(result).toHaveLength(2)

    expect(result[0].type).toBe(fetchProfileDataThunk.pending.type)
    expect(result[1].type).toBe(fetchProfileDataThunk.fulfilled.type)
    expect(result[1].payload).toEqual(data)
  })

  test('Проверка с rejected  ответом', async () => {
    const thunk = new TestAsyncThunk(fetchProfileDataThunk)
    thunk.api.get.mockResolvedValue({ status: 403 })

    // получаем dispatch[]
    const result = await thunk.callThunk('1')

    // проверяем что get был вызван
    expect(thunk.api.get).toHaveBeenCalled()
    // проверяем что длина вызовов всех dispatch === 2
    expect(result).toHaveLength(2)

    expect(result[0].type).toBe(fetchProfileDataThunk.pending.type)
    expect(result[1].type).toBe(fetchProfileDataThunk.rejected.type)
    expect(result[1].payload).toBe('my rejectWithValue error!')
    expect(result[1].meta.rejectedWithValue).toBe(true)
  })
})
