import { loginReducer } from '../model/slice/loginSlice'
import { loginByUsernameThunk } from '../model/services/loginByUsernameThunk'
import { LoginSchema } from '../model/types/loginSchema'

describe('todoSlice extra', () => {
  const initialStateLogin: LoginSchema = {
    isLoading: false,
    password: '',
    username: '',
    error: null
  }

  test('Проверка loginByUsernameThunk.pending', () => {
    const state = loginReducer(initialStateLogin, loginByUsernameThunk.pending)

    expect(state.isLoading).toBe(true)
    expect(state.error).toBeNull()
  })

  test.todo('Проверка loginByUsernameThunk.fulfilled')

  test('Проверка loginByUsernameThunk.rejected', () => {
    const action = {
      type: loginByUsernameThunk.rejected.type,
      payload: 'Cant post'
    }

    const state = loginReducer(initialStateLogin, action)

    expect(state).toEqual({
      isLoading: false,
      password: '',
      username: '',
      error: 'Cant post'
    })
  })
})
