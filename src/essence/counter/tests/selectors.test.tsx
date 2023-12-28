import { StateSchema } from '@/shared/lib/store/index'

import { getCounter } from '../model/selectors/getCounter'
import { getCounterValue } from '../model/selectors/getCounterValue'

describe('Selectors Counter', () => {
  test('Проверяем правильную работу getCounter', () => {
    const mockedState: DeepPartial<StateSchema> = { counter: { value: 10 } }

    expect(getCounter(mockedState as StateSchema).value).toBe(10)
    expect(getCounter(mockedState as StateSchema)).toEqual({ value: 10 })
  })

  test('Проверяем правильную работу getCounterValue', () => {
    const mockedState: DeepPartial<StateSchema> = { counter: { value: 10 } }

    expect(getCounterValue(mockedState as StateSchema)).toBe(10)
  })
})
