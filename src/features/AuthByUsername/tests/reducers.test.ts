import { loginActions, loginReducer } from '../model/slice/loginSlice'
import { LoginSchema } from '../model/types/loginSchema'

describe('loginSlice reducers', () => {
  const mockedState: LoginSchema = {
    error: null,
    isLoading: false,
    password: '',
    username: ''
  }

  test('Проверяем, что возвращается дефолтный стейт', () => {
    const result = loginReducer(undefined, { type: '' })

    expect(result).toEqual(mockedState)
  })

  test('Проверяем правильную работу setPassword', () => {
    const action = { type: loginActions.setPassword.type, payload: '123' }

    const result = loginReducer(mockedState, action)

    expect(result.password).toBe('123')
  })

  test('Проверяем правильную работу setUsername', () => {
    const action = { type: loginActions.setUsername.type, payload: 'admin' }

    const result = loginReducer(mockedState, action)

    expect(result.username).toBe('admin')
  })
})
