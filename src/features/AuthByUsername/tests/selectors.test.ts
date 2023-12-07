import { StateSchema } from 'shared/lib/store/index'

import { getLoginState } from '../model/selectors/getLoginState'

describe('Selectors Login', () => {
  test('Проверяем правильную работу getLoginState', () => {
    const mockedState: DeepPartial<StateSchema> = {
      loginForm: { error: null, isLoading: false, password: '', username: '' }
    }

    expect(getLoginState(mockedState as StateSchema)).toEqual({
      error: null,
      isLoading: false,
      password: '',
      username: ''
    })
  })

  test('Проверяем правильную работу getLoginState с state null', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getLoginState(null)).toEqual({
      error: null,
      isLoading: false,
      password: '',
      username: ''
    })
  })

  test('Проверяем правильную работу getLoginState с state error', () => {
    const mockedState: DeepPartial<StateSchema> = {
      loginForm: { error: 'error' }
    }

    expect(getLoginState(mockedState as StateSchema)).toEqual({
      error: 'error'
    })
  })
})
