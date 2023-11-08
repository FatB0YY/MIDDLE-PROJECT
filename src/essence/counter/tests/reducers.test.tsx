import { counterActions, counterReducer } from '../model/slice/counterSlice'
import { CounterSchema } from '../model/types/counterSchema'

describe('counterSlice reducers', () => {
  test('Проверяем, что возвращается дефолтный стейт', () => {
    const result = counterReducer(undefined, { type: '' })

    expect(result).toEqual({
      value: 0,
    })
  })

  test('Проверяем правильную работу increment', () => {
    const mockedState: CounterSchema = { value: 0 }

    const action = { type: counterActions.increment.type }

    const result = counterReducer(mockedState, action)

    expect(result.value).toBe(1)
    expect(result).toEqual({ value: 1 })
  })

  test('Проверяем правильную работу decrement', () => {
    const mockedState: CounterSchema = { value: 0 }

    const action = { type: counterActions.decrement.type }

    const result = counterReducer(mockedState, action)

    expect(result.value).toBe(-1)
    expect(result).toEqual({ value: -1 })
  })
})
