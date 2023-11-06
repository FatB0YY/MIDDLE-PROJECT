import { DeepPartial } from '@reduxjs/toolkit'
import { StateSchema } from 'shared/lib/store/index'

// заглушка
const mock: DeepPartial<StateSchema> = {
  loginForm: {
    error: null,
    isLoading: false,
    password: '',
    username: '',
  },
}

export const getLoginState = (state: StateSchema) => state?.loginForm || mock.loginForm
